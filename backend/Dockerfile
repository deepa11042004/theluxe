FROM node:20-alpine AS builder

WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Ensure default schema.prisma has sqlite configuration
RUN cp prisma/schema.sqlite.prisma prisma/schema.prisma

# Install all dependencies without running postinstall prematurely
RUN npm ci --ignore-scripts

# Generate Prisma client using SQLite schema
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

COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN cp prisma/schema.sqlite.prisma prisma/schema.prisma

# Install production dependencies only, ignoring scripts since Prisma is pre-generated
RUN npm ci --omit=dev --ignore-scripts

# Copy pre-generated Prisma client and engines from builder
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy compiled JavaScript output
COPY --from=builder /app/dist ./dist

EXPOSE 5001

CMD ["node", "dist/server.js"]
