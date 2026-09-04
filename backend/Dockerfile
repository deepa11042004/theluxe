FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate --schema=prisma/schema.sqlite.prisma

COPY tsconfig.json ./
COPY src ./src
RUN npx tsc

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5001
ENV DATABASE_URL="file:./dev.db"
ENV JWT_SECRET="the_luxe_yatra_super_secret_jwt_key_2026_phase1"
ENV JWT_EXPIRES_IN="7d"

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 5001

CMD ["node", "dist/server.js"]
