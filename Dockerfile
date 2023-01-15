FROM node:16.18.0
WORKDIR /usr/app

COPY package.json package-lock.json ./
run npm install
copy . .
run npm run build
CMD "node", "dist/server.js"