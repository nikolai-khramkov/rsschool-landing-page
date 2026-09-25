FROM node:24-alpine AS builder

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN npm install --global serve@14.2.5

COPY --from=builder /app/dist ./dist

EXPOSE 3000

USER node

CMD ["sh", "-c", "exec serve -s dist -l tcp://0.0.0.0:${PORT}"]
