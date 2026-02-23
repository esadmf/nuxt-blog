# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV CONTENT_DIR=/app/content

# Copy built app
COPY --from=builder /app/.output ./output

# Copy default content (overridden by volume mount in production)
COPY --from=builder /app/content ./content

EXPOSE 3000
CMD ["node", "output/server/index.mjs"]
