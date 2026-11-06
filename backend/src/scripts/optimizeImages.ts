/**
 * Shrinks oversized images in place (same file name, same format, so no database/code references change) WITHOUT visible loss.
 *
 *   node dist/scripts/optimizeImages.js <folder> [--dry-run] [--max-edge=2560] [--update-media] [--exclude=a,b] [--report=report.json]
 *
 * For every jpg/jpeg/png/webp it caps the long edge (default 2560px) and re-encodes it, then runs a quality gate that compares
 * the result with the original: similarity (PSNR) and sharpness (Laplacian variance). A file is only replaced when the result
 * is clearly smaller AND passes the gate; otherwise the original is left untouched, so nothing can end up blurry.
 * --update-media also fixes file_size/width/height of matching rows in the `media` table (DATABASE_URL must be set).
 */
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import sharp from "sharp";

dotenv.config();

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith("--"));
const flag = (name: string) => args.some((a) => a === `--${name}`);
const opt = (name: string, fallback: string) => (args.find((a) => a.startsWith(`--${name}=`)) || "").split("=")[1] || fallback;

const DRY = flag("dry-run");
const UPDATE_MEDIA = flag("update-media");
const MAX_EDGE = parseInt(opt("max-edge", "2560"), 10);
const REPORT = opt("report", "");
const EXCLUDE = opt("exclude", "").split(",").filter(Boolean); // top-level sub-folders of <folder> to skip
const RETRY_REPORT = opt("retry-failed", ""); // only re-try files that a previous report marked gate-failed
const SKIP_BELOW_BYTES = 350 * 1024; // already small and not oversized: not worth touching
const MIN_GAIN = 0.1; // replace only if at least 10% smaller
const MIN_PSNR = 38;
const NEAR_LOSSLESS_PSNR = 44;
const MIN_SHARPNESS_RATIO = 0.85;
const LADDER = [80, 88, 94];

type Outcome = "optimized" | "already-small" | "no-gain" | "gate-failed" | "skipped" | "error";
interface Result {
  file: string;
  outcome: Outcome;
  before: number;
  after: number;
  from?: string;
  to?: string;
  quality?: number;
  psnr?: number;
  sharpness?: number;
  note?: string;
}

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
}

// Pixels of the image as it will be shown: auto-rotated, capped to MAX_EDGE, alpha flattened onto grey so transparency is comparable.
async function rawAtTarget(input: Buffer, resize: boolean): Promise<{ rgb: Buffer; w: number; h: number }> {
  let img = sharp(input, { failOn: "none" }).rotate();
  if (resize) img = img.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
  const { data, info } = await img.flatten({ background: "#808080" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { rgb: data, w: info.width, h: info.height };
}

function psnr(a: Buffer, b: Buffer): number {
  const n = Math.min(a.length, b.length);
  let se = 0;
  for (let i = 0; i < n; i++) {
    const d = a[i] - b[i];
    se += d * d;
  }
  const mse = se / n;
  return mse === 0 ? 99 : 10 * Math.log10((255 * 255) / mse);
}

// Variance of the Laplacian of the luma channel: drops when an image gets smoother/blurrier.
function laplacianVariance(rgb: Buffer, w: number, h: number): number {
  const luma = new Float32Array(w * h);
  for (let i = 0, p = 0; i < luma.length; i++, p += 3) luma[i] = 0.299 * rgb[p] + 0.587 * rgb[p + 1] + 0.114 * rgb[p + 2];
  let sum = 0;
  let sumSq = 0;
  let count = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const v = 4 * luma[i] - luma[i - 1] - luma[i + 1] - luma[i - w] - luma[i + w];
      sum += v;
      sumSq += v * v;
      count++;
    }
  }
  const mean = sum / count;
  return sumSq / count - mean * mean;
}

async function encode(input: Buffer, format: string, quality: number, resize: boolean): Promise<Buffer> {
  let img = sharp(input, { failOn: "none" }).rotate();
  if (resize) img = img.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
  if (format === "webp") return img.webp({ quality, effort: 6, smartSubsample: true }).toBuffer();
  if (format === "jpeg") return img.jpeg({ quality, mozjpeg: true, chromaSubsampling: quality >= 90 ? "4:4:4" : "4:2:0" }).toBuffer();
  return img.png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true }).toBuffer(); // PNG stays lossless
}

async function processFile(file: string): Promise<Result> {
  const before = fs.statSync(file).size;
  const rel = path.relative(target!, file).replace(/\\/g, "/");
  try {
    const input = fs.readFileSync(file);
    const meta = await sharp(input, { failOn: "none" }).metadata();
    const format = meta.format === "jpg" ? "jpeg" : meta.format;
    if (!format || !["jpeg", "png", "webp"].includes(format)) return { file: rel, outcome: "skipped", before, after: before, note: `format ${format}` };
    if ((meta.pages || 1) > 1) return { file: rel, outcome: "skipped", before, after: before, note: "animated" };

    const long = Math.max(meta.width || 0, meta.height || 0);
    const oversized = long > MAX_EDGE;
    if (!oversized && before <= SKIP_BELOW_BYTES) return { file: rel, outcome: "already-small", before, after: before };

    // reference = the original at the final dimensions, so only the codec loss is measured (the size cap itself is intended)
    const ref = await rawAtTarget(input, true);
    const refSharp = laplacianVariance(ref.rgb, ref.w, ref.h);
    const qualities = format === "png" ? [100] : LADDER;
    let lastNote = "";

    for (const q of qualities) {
      const out = await encode(input, format, q, true);
      if (out.length > before * (1 - MIN_GAIN)) {
        lastNote = `q${q}: only ${(100 * (1 - out.length / before)).toFixed(0)}% smaller`;
        continue;
      }
      const test = await rawAtTarget(out, false);
      if (test.w !== ref.w || test.h !== ref.h) {
        lastNote = "dimension mismatch in comparison";
        continue;
      }
      const p = psnr(ref.rgb, test.rgb);
      const sharpRatio = refSharp === 0 ? 1 : laplacianVariance(test.rgb, test.w, test.h) / refSharp;
      // near-identical pixels (PSNR >= 44) pass on similarity alone: on smooth/soft images the sharpness ratio is dominated by noise
      if ((p >= MIN_PSNR && sharpRatio >= MIN_SHARPNESS_RATIO) || p >= NEAR_LOSSLESS_PSNR) {
        const outMeta = await sharp(out).metadata();
        if (!DRY) {
          const tmp = file + ".opt-tmp";
          fs.writeFileSync(tmp, out);
          fs.renameSync(tmp, file);
        }
        return {
          file: rel,
          outcome: "optimized",
          before,
          after: out.length,
          from: `${meta.width}x${meta.height}`,
          to: `${outMeta.width}x${outMeta.height}`,
          quality: q,
          psnr: +p.toFixed(1),
          sharpness: +sharpRatio.toFixed(2),
        };
      }
      lastNote = `q${q}: psnr ${p.toFixed(1)}, sharpness ${sharpRatio.toFixed(2)}`;
    }
    const gainFail = lastNote.includes("smaller");
    return { file: rel, outcome: gainFail ? "no-gain" : "gate-failed", before, after: before, note: lastNote };
  } catch (err: any) {
    return { file: rel, outcome: "error", before, after: before, note: String(err?.message || err).slice(0, 120) };
  }
}

async function main() {
  if (!target || !fs.existsSync(target) || !fs.statSync(target).isDirectory()) {
    console.error("Usage: optimizeImages <folder> [--dry-run] [--max-edge=2560] [--update-media] [--report=file.json]");
    process.exit(1);
  }
  const retry = RETRY_REPORT
    ? new Set((JSON.parse(fs.readFileSync(RETRY_REPORT, "utf8")) as Result[]).filter((r) => r.outcome === "gate-failed").map((r) => r.file))
    : null;
  const files = walk(target).filter((f) => {
    const rel = path.relative(target, f).replace(/\\/g, "/");
    return /\.(jpe?g|png|webp)$/i.test(f) && !EXCLUDE.some((x) => rel.startsWith(x + "/")) && (!retry || retry.has(rel));
  });
  console.log(`${DRY ? "[DRY RUN] " : ""}Optimizing ${files.length} images in ${path.resolve(target)} (max edge ${MAX_EDGE}px)`);

  const results: Result[] = [];
  const CONCURRENCY = 3;
  let next = 0;
  let done = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < files.length) {
        const file = files[next++];
        const r = await processFile(file);
        results.push(r);
        done++;
        if (done % 25 === 0 || done === files.length) console.log(`  ${done}/${files.length} processed`);
      }
    })
  );

  const sum = (rs: Result[], k: "before" | "after") => rs.reduce((n, r) => n + r[k], 0);
  const mb = (n: number) => (n / 1048576).toFixed(1) + " MB";
  const by = (o: Outcome) => results.filter((r) => r.outcome === o);
  console.log("\nSUMMARY");
  for (const o of ["optimized", "already-small", "no-gain", "gate-failed", "skipped", "error"] as Outcome[]) {
    const rs = by(o);
    if (rs.length) console.log(`  ${o.padEnd(14)} ${String(rs.length).padStart(4)} files  ${mb(sum(rs, "before")).padStart(9)} -> ${mb(sum(rs, "after")).padStart(9)}`);
  }
  console.log(`  TOTAL                ${String(results.length).padStart(4)} files  ${mb(sum(results, "before")).padStart(9)} -> ${mb(sum(results, "after")).padStart(9)}  (saves ${mb(sum(results, "before") - sum(results, "after"))})`);
  const opt2 = by("optimized");
  if (opt2.length) {
    console.log(`  quality gate on optimized files: PSNR min ${Math.min(...opt2.map((r) => r.psnr!))} dB, sharpness ratio min ${Math.min(...opt2.map((r) => r.sharpness!))}`);
  }
  for (const r of [...by("gate-failed"), ...by("error")].slice(0, 15)) console.log(`  KEPT ORIGINAL ${r.file}: ${r.note}`);

  if (UPDATE_MEDIA && !DRY) {
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();
    let updated = 0;
    for (const r of opt2) {
      const [w, h] = (r.to || "0x0").split("x").map(Number);
      const res = await prisma.media.updateMany({ where: { url: `/uploads/${r.file}` }, data: { file_size: r.after, width: w, height: h } });
      updated += res.count;
    }
    await prisma.$disconnect();
    console.log(`  media table: ${updated} rows updated (file_size/width/height)`);
  }
  if (REPORT) fs.writeFileSync(REPORT, JSON.stringify(results, null, 1));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
