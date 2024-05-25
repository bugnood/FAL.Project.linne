# Dockerfile for Express server
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5002

CMD ["node_modules/.bin/ts-node", "index.ts"]
