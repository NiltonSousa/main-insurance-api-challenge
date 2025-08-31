FROM node:20-alpine AS build
WORKDIR /app

# Instalar deps (inclui devDeps para tsup/typescript)
COPY package*.json ./
RUN npm ci

# Copiar configs e código antes do build
COPY tsconfig*.json ./
COPY tsup.config.* ./
COPY src ./src
COPY prisma ./prisma

# Build com tsup (usa script com entrada explícita)
RUN npm run build

# Gere o Prisma Client (precisa do schema e das deps já instaladas)
# Se seu generate depende de DATABASE_URL, use PRISMA_SKIP_POSTINSTALL=1 e gere aqui
ENV PRISMA_SKIP_POSTINSTALL=1
RUN npx prisma generate

# Stage 2: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# Só dependências de produção
COPY package*.json ./
RUN npm ci --omit=dev

# Copie artefatos do build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

# expor env pro prisma
ENV DATABASE_URL="file:/app/prisma/dev.db"

# Porta e comando
EXPOSE 3000
CMD ["node", "dist/main/server.js"]
