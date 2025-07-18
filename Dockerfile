# Stage 1: Build
FROM node:20-slim AS builder

RUN apt-get update && apt-get install

WORKDIR /app_root/web

# Copy package fils first
COPY ./web/package*.json ./web/next.config.ts ./

# Install all dep, leaving out dev dep
RUN npm install -omit=dev

COPY ./web ./
COPY ./lib /app_root/lib

# list file structure
RUN ls -al && pwd

# Build next.js app
RUN npm run build

# Stage 2: Production container
FROM node:20-slim

WORKDIR /app_root/web

# Install runtime deps
RUN apt-get update && apt-get install

# Copy packages and install deps into final image
COPY ./web/package*.json ./web/next.config.ts ./
RUN npm install --omit=dev

# Copy production build artifcats from stage 1/ builder
COPY --from=builder /app_root/web/public ./public
COPY --from=builder /app_root/web/.next ./.next
COPY --from=builder /app_root/web/app ./app

# Copy entrypoint into containerA
COPY ./docker_scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV NODE_ENV=production
EXPOSE 3000

CMD ["/entrypoint.sh"]



