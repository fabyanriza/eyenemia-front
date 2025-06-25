# Tahap build React
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Tahap serve dengan Nginx
FROM nginx:alpine

# Hapus default config nginx
RUN rm -rf /usr/share/nginx/html/*

# Salin hasil build ke nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Tambah konfigurasi nginx custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
