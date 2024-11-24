FROM node:20-bullseye as builder

RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  pkg-config

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build:execution-node

RUN yarn package:execution-node:for-pi

RUN mkdir -p /app/output
RUN cp /app/execution-node /app/output/execution-node