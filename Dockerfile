FROM oven/bun:latest

# Set the working directory
WORKDIR /usr/src/app

COPY package.json tsconfig.json .env bun.lockb ./

COPY src ./

# Expose port 3000
EXPOSE 3000

RUN bun install

# Command to run the application
CMD ["bun", "run", "dev"]