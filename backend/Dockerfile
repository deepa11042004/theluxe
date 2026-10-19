FROM node:20-alpine AS builder

WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Ensure schema.prisma is present
RUN cp prisma/schema.sqlite.prisma prisma/schema.prisma

# Install dependencies and generate Prisma client
# --include=dev: the TypeScript compiler is a devDependency and must be installed even when the host sets NODE_ENV=production at build time
RUN npm ci --ignore-scripts --include=dev
RUN npx prisma generate --schema=prisma/schema.sqlite.prisma
# Pre-download the schema engine now so `prisma db push` at container start needs no network (best effort)
RUN DATABASE_URL="file:/tmp/warmup.db" npx prisma db push --skip-generate --schema=prisma/schema.sqlite.prisma || true

COPY tsconfig.json ./
COPY src ./src
RUN ./node_modules/.bin/tsc

FROM node:20-alpine AS runner

WORKDIR /app

# Install openssl for Prisma runtime
RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=5001
ENV DATABASE_URL="file:./dev.db"

COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 5001

# On start: if DATABASE_URL points to a persistent path (e.g. /data/dev.db) and the file does not exist yet, seed it ONCE
# from the database baked into the image; later deploys never overwrite it. Then apply additive schema changes.
CMD DB_FILE="${DATABASE_URL#file:}"; case "$DB_FILE" in /*) DB_DIR="$(dirname "$DB_FILE")"; mkdir -p "$DB_DIR"; if [ -f "$DB_FILE" ]; then echo "[startup] Using existing database: $DB_FILE"; else echo "[startup] Seeding NEW database from the image: $DB_FILE"; cp prisma/dev.db "$DB_FILE"; fi; if ! mountpoint -q "$DB_DIR"; then echo "[startup] WARNING: $DB_DIR is NOT a mounted persistent volume - all data will be LOST on the next redeploy"; fi ;; *) echo "[startup] WARNING: DATABASE_URL=$DATABASE_URL is inside the container - all data will be LOST on the next redeploy" ;; esac; npx prisma db push --skip-generate --schema=prisma/schema.sqlite.prisma || echo "WARN: prisma db push failed"; exec node dist/server.js
