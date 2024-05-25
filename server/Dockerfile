# Dockerfile for Express server
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5002

CMD ["npx", "nodemon", "--legacy-watch", "index.ts"]