FROM node:20-alpine AS builder

WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
# --include=dev: the TypeScript compiler is a devDependency and must be installed even when the host sets NODE_ENV=production at build time
RUN npm ci --ignore-scripts --include=dev
# MySQL client used by the app, plus the legacy SQLite client that only the one-time data migration script uses
RUN npx prisma generate
RUN npx prisma generate --schema=prisma/schema.sqlite.prisma
# Pre-download the schema engine now so `prisma db push` at container start needs no extra download (best effort; the dummy URL is never reachable)
RUN DATABASE_URL="mysql://warmup:warmup@127.0.0.1:1/warmup" npx prisma db push --skip-generate || true

COPY tsconfig.json ./
COPY src ./src
RUN ./node_modules/.bin/tsc

FROM node:20-alpine AS runner

WORKDIR /app

# Install openssl for Prisma runtime
RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=5001

COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 5001

# DATABASE_URL (mysql://...) is provided by the host at runtime. On start, additive schema changes are applied; `db push`
# refuses anything that would lose data, in which case the app still starts and the warning is in the log.
CMD npx prisma db push --skip-generate || echo "WARN: prisma db push failed"; exec node dist/server.js
