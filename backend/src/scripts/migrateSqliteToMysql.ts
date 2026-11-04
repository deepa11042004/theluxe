/**
 * One-time data migration: legacy SQLite database -> MySQL.
 *
 *   node dist/scripts/migrateSqliteToMysql.js --dry-run     (reads only, reports problems, writes nothing)
 *   node dist/scripts/migrateSqliteToMysql.js               (copies the data, then verifies it)
 *
 * Environment:
 *   SOURCE_SQLITE_PATH   path of the SQLite file to read           (default /data/dev.db)
 *   DATABASE_URL         mysql:// URL of the target database       (or TARGET_DATABASE_URL, which wins)
 *
 * Safety:
 *   - never modifies/deletes the SQLite file (its SHA-256 is compared before and after the run)
 *   - never drops, truncates or deletes anything in MySQL; it only INSERTs rows whose id is missing there
 *   - re-runnable: rows already present (same id) are skipped and compared instead of duplicated
 *   - plain INSERTs (no INSERT IGNORE), so an oversized value fails loudly instead of being silently truncated
 *   - the model list and the foreign-key order come from the Prisma schema, nothing is hardcoded
 *
 * Needs the legacy client:  npm run prisma:generate:sqlite   (done automatically in the Docker build)
 */
import crypto from "crypto";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry-run");
const SOURCE_PATH = path.resolve(process.env.SOURCE_SQLITE_PATH || "/data/dev.db");
const TARGET_URL = (process.env.TARGET_DATABASE_URL || process.env.DATABASE_URL || "").trim();

const MAX_BATCH_ROWS = 500;
const MAX_BATCH_BYTES = 8 * 1024 * 1024;

const INT32_MIN = -2147483648;
const INT32_MAX = 2147483647;

type Row = Record<string, any>;

const blockers: string[] = [];
const warnings: string[] = [];

function log(message = "") {
  console.log(message);
}

function lowerFirst(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function sha256File(file: string): string {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

// Same comparison MySQL's default utf8mb4_0900_ai_ci collation uses for UNIQUE keys: case- and accent-insensitive.
function collationKey(value: any): string {
  return String(value).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function fail(message: string): never {
  console.error(`\nERROR: ${message}`);
  process.exit(1);
}

function maskedTarget(url: string): string {
  try {
    const u = new URL(url);
    return `${u.hostname}:${u.port || "3306"}${u.pathname}`;
  } catch {
    return "(unparseable URL)";
  }
}

// ---------------------------------------------------------------- schema introspection (from Prisma's DMMF)

interface ModelInfo {
  name: string;
  table: string;
  delegate: string;
  idField: string;
  fields: any[];
  scalarFields: any[];
  foreignKeys: { fromFields: string[]; toModel: string }[];
  uniqueSets: string[][];
}

function loadModels(dmmf: any): ModelInfo[] {
  return dmmf.datamodel.models.map((m: any) => {
    const scalarFields = m.fields.filter((f: any) => f.kind === "scalar" || f.kind === "enum");
    const idFields = m.fields.filter((f: any) => f.isId);
    if (idFields.length !== 1) fail(`Model ${m.name} must have exactly one @id field (found ${idFields.length}).`);
    const uniqueSets: string[][] = [];
    for (const f of m.fields) if (f.isUnique) uniqueSets.push([f.name]);
    for (const u of m.uniqueFields || []) uniqueSets.push(u);
    return {
      name: m.name,
      table: m.dbName || m.name,
      delegate: lowerFirst(m.name),
      idField: idFields[0].name,
      fields: m.fields,
      scalarFields,
      foreignKeys: m.fields
        .filter((f: any) => f.kind === "object" && f.relationFromFields && f.relationFromFields.length > 0)
        .map((f: any) => ({ fromFields: f.relationFromFields as string[], toModel: f.type as string })),
      uniqueSets,
    };
  });
}

// Parents before children, derived from the foreign keys.
function foreignKeyOrder(models: ModelInfo[]): ModelInfo[] {
  const byName = new Map(models.map((m) => [m.name, m]));
  const remaining = new Map(
    models.map((m) => [m.name, new Set(m.foreignKeys.map((fk) => fk.toModel).filter((n) => n !== m.name))])
  );
  const ordered: ModelInfo[] = [];
  while (remaining.size > 0) {
    const ready = [...remaining.entries()].filter(([, deps]) => [...deps].every((d) => !remaining.has(d)));
    if (ready.length === 0) fail(`Circular foreign keys between: ${[...remaining.keys()].join(", ")}`);
    for (const [name] of ready) {
      ordered.push(byName.get(name)!);
      remaining.delete(name);
    }
  }
  return ordered;
}

// ---------------------------------------------------------------- canonical form + checksums

function canonicalValue(value: any): any {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value.getTime();
  if (typeof value === "bigint") return value.toString();
  if (Buffer.isBuffer(value)) return value.toString("base64");
  if (typeof value === "object") {
    if (typeof value.toFixed === "function" && typeof value.toString === "function") return value.toString(); // Decimal
    return JSON.stringify(value);
  }
  return value;
}

function rowFingerprint(model: ModelInfo, row: Row): string {
  const canonical = model.scalarFields.map((f) => canonicalValue(row[f.name]));
  return crypto.createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
}

function tableChecksum(model: ModelInfo, rows: Row[]): string {
  const sorted = [...rows].sort((a, b) => (a[model.idField] < b[model.idField] ? -1 : a[model.idField] > b[model.idField] ? 1 : 0));
  const h = crypto.createHash("sha256");
  for (const row of sorted) h.update(row[model.idField] + ":" + rowFingerprint(model, row) + "\n");
  return h.digest("hex").slice(0, 12);
}

// ---------------------------------------------------------------- main

async function main() {
  log(`SQLite -> MySQL data migration ${DRY_RUN ? "(DRY RUN: nothing will be written)" : "(LIVE RUN)"}`);
  log(`Source SQLite : ${SOURCE_PATH}`);
  log(`Target MySQL  : ${maskedTarget(TARGET_URL)}`);

  if (!fs.existsSync(SOURCE_PATH)) fail(`SQLite file not found: ${SOURCE_PATH} (set SOURCE_SQLITE_PATH).`);
  if (!/^mysql:\/\//i.test(TARGET_URL)) fail("DATABASE_URL (or TARGET_DATABASE_URL) must be a mysql:// URL.");

  const sourceHashBefore = sha256File(SOURCE_PATH);
  const sourceSize = fs.statSync(SOURCE_PATH).size;
  log(`SQLite file   : ${sourceSize} bytes, sha256 ${sourceHashBefore.slice(0, 16)}...`);

  // two separate generated clients: the app's MySQL client and the legacy SQLite client
  const mysqlLib = require("@prisma/client");
  const sqliteClientPath = path.resolve(__dirname, "../../node_modules/.prisma/sqlite-client");
  if (!fs.existsSync(sqliteClientPath)) fail(`SQLite client not generated (${sqliteClientPath}). Run: npm run prisma:generate:sqlite`);
  const sqliteLib = require(sqliteClientPath);

  const mysqlModels = loadModels(mysqlLib.Prisma.dmmf);
  const sqliteModels = loadModels(sqliteLib.Prisma.dmmf);

  // the two schema files must describe the same tables and columns, otherwise the copy would be wrong
  const sqliteByName = new Map(sqliteModels.map((m) => [m.name, m]));
  for (const m of mysqlModels) {
    const other = sqliteByName.get(m.name);
    if (!other) fail(`Model ${m.name} exists in schema.prisma but not in schema.sqlite.prisma.`);
    const a = m.scalarFields.map((f) => `${f.name}:${f.type}`).join(",");
    const b = other.scalarFields.map((f) => `${f.name}:${f.type}`).join(",");
    if (a !== b) fail(`Model ${m.name} differs between schema.prisma and schema.sqlite.prisma.\n  mysql : ${a}\n  sqlite: ${b}`);
  }
  if (sqliteModels.length !== mysqlModels.length) fail("The two schemas have a different number of models.");

  const models = foreignKeyOrder(mysqlModels);
  log(`Models        : ${models.length}, copy order: ${models.map((m) => m.table).join(" > ")}`);

  const source = new sqliteLib.PrismaClient({
    datasources: { db: { url: "file:" + SOURCE_PATH.replace(/\\/g, "/") } },
  });
  const target = new mysqlLib.PrismaClient({ datasources: { db: { url: TARGET_URL } } });

  try {
    // ------------------------------------------------------------ read the whole source
    log("\n[1/4] Reading SQLite");
    const data: Record<string, Row[]> = {};
    for (const m of models) {
      try {
        data[m.name] = await source[m.delegate].findMany();
      } catch (err: any) {
        blockers.push(`Cannot read table ${m.table} from SQLite: ${String(err?.message || err).split("\n").pop()}`);
        data[m.name] = [];
      }
      log(`  ${m.table.padEnd(26)} ${String(data[m.name].length).padStart(6)} rows`);
    }

    // ------------------------------------------------------------ inspect the target
    log("\n[2/4] Checking MySQL");
    let tableCollations = new Map<string, string>();
    let columnInfo = new Map<string, { type: string; maxChars: number; maxBytes: number }>();
    let targetReady = false;
    try {
      const [info] = await target.$queryRawUnsafe(
        "SELECT VERSION() AS v, @@character_set_database AS cs, @@collation_database AS co, @@sql_mode AS sm, DATABASE() AS db"
      );
      log(`  MySQL ${info.v}, database "${info.db}", charset ${info.cs}, collation ${info.co}`);
      if (!/^utf8mb4/i.test(info.cs)) blockers.push(`Database default charset is "${info.cs}", it must be utf8mb4 (needed for "₹" and emoji).`);
      if (!/STRICT_TRANS_TABLES|STRICT_ALL_TABLES/.test(info.sm)) warnings.push("sql_mode is not strict: oversized values could be truncated silently.");

      const tables: Row[] = await target.$queryRawUnsafe(
        "SELECT TABLE_NAME AS t, TABLE_COLLATION AS co FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()"
      );
      tableCollations = new Map(tables.map((r) => [String(r.t), String(r.co)]));
      const missing = models.filter((m) => !tableCollations.has(m.table)).map((m) => m.table);
      if (missing.length) {
        blockers.push(`MySQL tables missing: ${missing.join(", ")}. Create them first: npx prisma db push`);
      } else {
        const columns: Row[] = await target.$queryRawUnsafe(
          "SELECT TABLE_NAME AS t, COLUMN_NAME AS c, DATA_TYPE AS dt, CHARACTER_MAXIMUM_LENGTH AS maxchars, CHARACTER_OCTET_LENGTH AS maxbytes " +
            "FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE()"
        );
        columnInfo = new Map(
          columns.map((r) => [`${r.t}.${r.c}`, { type: String(r.dt).toLowerCase(), maxChars: Number(r.maxchars), maxBytes: Number(r.maxbytes) }])
        );
        for (const m of models) {
          const co = tableCollations.get(m.table) || "";
          if (!/^utf8mb4/i.test(co)) blockers.push(`Table ${m.table} has collation "${co}", expected utf8mb4_*.`);
          for (const f of m.scalarFields) {
            if (!columnInfo.has(`${m.table}.${f.name}`)) blockers.push(`Column ${m.table}.${f.name} is missing in MySQL. Run: npx prisma db push`);
          }
        }
        targetReady = true;
        log(`  ${models.length} tables found, columns and charset checked`);
      }
    } catch (err: any) {
      blockers.push(`Cannot query MySQL: ${String(err?.message || err).split("\n").filter(Boolean).pop()}`);
    }

    // ------------------------------------------------------------ pre-flight checks on the data
    log("\n[3/4] Checking the data fits MySQL");
    const idSets = new Map<string, Set<string>>();
    for (const m of models) idSets.set(m.name, new Set(data[m.name].map((r) => r[m.idField])));

    for (const m of models) {
      const rows = data[m.name];

      // value sizes / ranges
      const worst = new Map<string, number>();
      for (const row of rows) {
        for (const f of m.scalarFields) {
          const v = row[f.name];
          if (v === null || v === undefined) continue;
          if (f.type === "Int" && (v < INT32_MIN || v > INT32_MAX)) {
            blockers.push(`${m.table}.${f.name}: value ${v} (id ${row[m.idField]}) does not fit MySQL INT.`);
          }
          if (f.type === "String" && targetReady) {
            const col = columnInfo.get(`${m.table}.${f.name}`);
            if (!col) continue;
            const isVarchar = col.type === "varchar" || col.type === "char";
            const size = isVarchar ? Array.from(v as string).length : Buffer.byteLength(v as string, "utf8");
            const limit = isVarchar ? col.maxChars : col.maxBytes;
            if (size > limit) {
              blockers.push(`${m.table}.${f.name}: id ${row[m.idField]} has ${size}${isVarchar ? " chars" : " bytes"}, column ${col.type} allows ${limit}.`);
            }
            worst.set(f.name, Math.max(worst.get(f.name) || 0, size));
          }
        }
      }

      // unique keys, compared the way MySQL will compare them (case/accent-insensitive)
      for (const set of [[m.idField], ...m.uniqueSets]) {
        const seen = new Map<string, string>();
        for (const row of rows) {
          if (set.some((f) => row[f] === null || row[f] === undefined)) continue;
          const key = set.map((f) => collationKey(row[f])).join("\u0001");
          const prev = seen.get(key);
          if (prev !== undefined) {
            blockers.push(
              `${m.table}: rows ${prev} and ${row[m.idField]} collide on unique (${set.join(", ")}) under MySQL's case-insensitive collation: "${set.map((f) => row[f]).join(" / ")}".`
            );
          } else seen.set(key, row[m.idField]);
        }
      }

      // foreign keys must point at existing parents
      for (const fk of m.foreignKeys) {
        const parentIds = idSets.get(fk.toModel)!;
        let orphans = 0;
        for (const row of rows) {
          const values = fk.fromFields.map((f) => row[f]);
          if (values.some((v) => v === null || v === undefined)) continue;
          if (!parentIds.has(values[0])) orphans++;
        }
        if (orphans) blockers.push(`${m.table}.${fk.fromFields.join(",")}: ${orphans} row(s) reference a missing ${fk.toModel}.`);
      }
    }
    log(blockers.length ? `  ${blockers.length} problem(s) found` : "  all values fit, unique keys are safe, foreign keys are consistent");

    // ------------------------------------------------------------ report problems
    if (warnings.length) {
      log("\nWARNINGS");
      for (const w of warnings) log(`  - ${w}`);
    }
    if (blockers.length) {
      log("\nBLOCKING PROBLEMS (nothing was written)");
      for (const b of blockers.slice(0, 60)) log(`  - ${b}`);
      if (blockers.length > 60) log(`  ... and ${blockers.length - 60} more`);
    }

    // target row counts before the copy
    const before = new Map<string, number>();
    if (targetReady) for (const m of models) before.set(m.name, await target[m.delegate].count());

    if (DRY_RUN) {
      log("\nDRY RUN SUMMARY");
      log(`${"table".padEnd(26)} ${"sqlite".padStart(8)} ${"mysql now".padStart(10)}`);
      for (const m of models) log(`${m.table.padEnd(26)} ${String(data[m.name].length).padStart(8)} ${String(before.get(m.name) ?? "?").padStart(10)}`);
      const total = models.reduce((n, m) => n + data[m.name].length, 0);
      log(`\n${total} rows would be copied. ${blockers.length ? "FIX THE BLOCKING PROBLEMS ABOVE FIRST." : "No blocking problems: safe to run for real."}`);
      process.exitCode = blockers.length ? 1 : 0;
      return;
    }

    if (blockers.length) fail("Not copying anything because of the blocking problems above.");

    // ------------------------------------------------------------ copy
    log("\n[4/4] Copying");
    for (const [i, m] of models.entries()) {
      const rows = data[m.name];
      const tag = `[${i + 1}/${models.length}] ${m.table}`;
      if (rows.length === 0) {
        log(`  ${tag}: empty, nothing to copy`);
        continue;
      }

      const existing = new Set<string>();
      const ids = rows.map((r) => r[m.idField] as string);
      for (let o = 0; o < ids.length; o += 1000) {
        const found = await target[m.delegate].findMany({ where: { [m.idField]: { in: ids.slice(o, o + 1000) } }, select: { [m.idField]: true } });
        for (const f of found) existing.add(f[m.idField]);
      }
      const missing = rows.filter((r) => !existing.has(r[m.idField]));
      if (missing.length === 0) {
        log(`  ${tag}: all ${rows.length} rows already in MySQL`);
        continue;
      }

      const batches: Row[][] = [];
      let batch: Row[] = [];
      let bytes = 0;
      for (const row of missing) {
        const size = JSON.stringify(row).length;
        if (batch.length && (batch.length >= MAX_BATCH_ROWS || bytes + size > MAX_BATCH_BYTES)) {
          batches.push(batch);
          batch = [];
          bytes = 0;
        }
        batch.push(row);
        bytes += size;
      }
      if (batch.length) batches.push(batch);

      // one transaction per table: a failure leaves that table untouched, so the script can simply be re-run
      await target.$transaction(
        async (tx: any) => {
          for (const b of batches) await tx[m.delegate].createMany({ data: b });
        },
        { timeout: 300000, maxWait: 30000 }
      );
      log(`  ${tag}: inserted ${missing.length} of ${rows.length} rows (${rows.length - missing.length} already present)`);
    }

    // keep AUTO_INCREMENT counters ahead of the copied ids (none of the current models use autoincrement ids)
    for (const m of models) {
      const auto = m.scalarFields.find((f) => f.isId && f.default && f.default.name === "autoincrement");
      if (!auto) continue;
      const max = data[m.name].reduce((n, r) => Math.max(n, Number(r[auto.name])), 0);
      await target.$executeRawUnsafe(`ALTER TABLE \`${m.table}\` AUTO_INCREMENT = ${Math.floor(max) + 1}`);
      log(`  ${m.table}: AUTO_INCREMENT set to ${Math.floor(max) + 1}`);
    }

    // ------------------------------------------------------------ verify
    log("\nVERIFICATION (row counts and a checksum of every row's content)");
    log(`${"table".padEnd(26)} ${"sqlite".padStart(8)} ${"mysql".padStart(8)}  ${"content".padEnd(16)} result`);
    let mismatches = 0;
    for (const m of models) {
      const sRows = data[m.name];
      const tRows: Row[] = await target[m.delegate].findMany();
      const sSum = tableChecksum(m, sRows);
      const tSum = tableChecksum(m, tRows);
      const ok = sRows.length === tRows.length && sSum === tSum;
      if (!ok) mismatches++;
      log(
        `${m.table.padEnd(26)} ${String(sRows.length).padStart(8)} ${String(tRows.length).padStart(8)}  ${(sSum === tSum ? "identical" : "DIFFERENT").padEnd(16)} ${ok ? "OK" : "MISMATCH"}`
      );
    }

    const sourceHashAfter = sha256File(SOURCE_PATH);
    const sourceUntouched = sourceHashAfter === sourceHashBefore;
    log(`\nSQLite file unchanged during the run: ${sourceUntouched ? "yes" : "NO (something wrote to it while the script was running)"}`);

    if (mismatches || !sourceUntouched) {
      log(`\nFAILED: ${mismatches} table(s) differ${sourceUntouched ? "" : ", and the source changed during the run"}. Do NOT switch the app to MySQL yet.`);
      process.exitCode = 1;
    } else {
      log("\nSUCCESS: every table has the same row count and identical content in MySQL.");
    }
  } finally {
    await source.$disconnect().catch(() => undefined);
    await target.$disconnect().catch(() => undefined);
  }
}

main().catch((err) => {
  console.error("\nUnexpected error:", err);
  process.exit(1);
});
