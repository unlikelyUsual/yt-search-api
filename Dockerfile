FROM oven/bun:1.0

WORKDIR /app

COPY package.json package.json

COPY bun.lockb bun.lockb

#install dependency
RUN bun install

COPY . .

#expore endpoint
EXPOSE 3000

ENTRYPOINT ["bun", "index.ts"]