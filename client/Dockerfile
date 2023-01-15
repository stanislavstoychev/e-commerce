FROM  node:16.18.0 AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
run npm install
copy . .
run npm run build
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from-build /usr/src/app/dist/client isr/share/nginx/html

CMD "nginx", "-g",  "daemon off;"