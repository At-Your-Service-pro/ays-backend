# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./    
RUN npm install && npm audit fix || true

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app

# Add bash
RUN apk add --no-cache bash

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY tsconfig.json ./ 
COPY .env ./.env
COPY src ./src 
COPY knexfile.js .

COPY wait-for-it.sh ./wait-for-it.sh
RUN chmod +x wait-for-it.sh
# RUN chmod +x wait-for-db.sh


EXPOSE 3104
CMD ["./wait-for-it.sh", "db:5432", "--","npx", "knex", "migrate:latest", "--knexfile", "knexfile.js","&&", "node", "dist/src/main"]
