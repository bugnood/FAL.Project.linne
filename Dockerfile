# Dockerfile for managing both services (React + Express)
# This Dockerfile is not required for building images, it's just for reference

# Build React app
FROM node:18-alpine AS react-builder
WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install
COPY client .
RUN npm run build

# Build Express server
FROM node:18-alpine AS express-builder
WORKDIR /usr/src/app/server
COPY server/package*.json ./
RUN npm install
COPY server .
RUN npm run build

# Final image combining React app and Express server
FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=react-builder /usr/src/app/client/build ./client/build
COPY --from=express-builder /usr/src/app/server ./server

EXPOSE 5002

CMD ["node", "./server/index.js"]
