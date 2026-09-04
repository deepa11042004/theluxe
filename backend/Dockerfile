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

CMD ["node", "dist/server.js"]
