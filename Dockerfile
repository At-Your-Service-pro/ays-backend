# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install && npm audit fix || true

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY .env ./.env

EXPOSE 3104
CMD ["node", "dist/src/main"]
