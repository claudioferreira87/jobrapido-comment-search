FROM node:22-alpine AS builder

LABEL maintainer="Claudio Ferreira"
LABEL description="Comment Search - Jobrapido Frontend Test"

# Habilita pnpm via Corepack (built-in Node 22)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copia arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instala dependências (--frozen-lockfile = não atualiza lock)
RUN pnpm install --frozen-lockfile

# Copia código fonte
COPY . .

# Build para produção
RUN pnpm run build

# Production stage - servidor web
FROM nginx:alpine

# Copia arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

# Config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Porta
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080 || exit 1

# Start
CMD ["nginx", "-g", "daemon off;"]
