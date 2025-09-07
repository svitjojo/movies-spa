# ---------- Build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- Runtime ----------
FROM node:20-alpine
WORKDIR /usr/share/movies

RUN npm i -g serve

COPY --from=build /app/dist ./dist
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["serve", "-s", "dist", "-l", "3000"]
