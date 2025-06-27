FROM node:20-alpine

WORKDIR /app

# Copy only package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm & deps
RUN npm install -g pnpm
RUN pnpm install

# Copy all source (termasuk folder prisma/)
COPY . .

# Baru sekarang Prisma bisa dijalankan
RUN npx prisma generate

# Build Next.js
RUN pnpm run build

CMD ["pnpm", "start"]
