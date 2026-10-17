FROM node:20-alpine AS builder

WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Ensure schema.prisma is present
RUN cp prisma/schema.sqlite.prisma prisma/schema.prisma

# Install dependencies and generate Prisma client
RUN npm ci --ignore-scripts
RUN npx prisma generate --schema=prisma/schema.sqlite.prisma
# Pre-download the schema engine now so `prisma db push` at container start needs no network (best effort)
RUN DATABASE_URL="file:/tmp/warmup.db" npx prisma db push --skip-generate --schema=prisma/schema.sqlite.prisma || true

COPY tsconfig.json ./
COPY src ./src
RUN npx tsc

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
CMD DB_FILE="${DATABASE_URL#file:}"; case "$DB_FILE" in /*) mkdir -p "$(dirname "$DB_FILE")"; [ -f "$DB_FILE" ] || cp prisma/dev.db "$DB_FILE" ;; esac; npx prisma db push --skip-generate --schema=prisma/schema.sqlite.prisma || echo "WARN: prisma db push failed"; exec node dist/server.js
