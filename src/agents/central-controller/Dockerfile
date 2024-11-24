FROM node:20-bullseye-slim

WORKDIR /app

COPY ../../../dist/central-controller ./central-controller
COPY package.json ./central-controller/package.json

CMD ["node", "./central-controller/bundle.js"]