FROM node:20-bullseye

RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  pkg-config \
  gcc-arm-linux-gnueabihf \
  g++-arm-linux-gnueabihf \
  qemu-user-static

ENV CROSS_COMPILE=arm-linux-gnueabihf-
ENV PKG_CONFIG_PATH=/usr/arm-linux-gnueabihf/lib/pkgconfig

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build:execution-node

RUN yarn package:execution-node:for-pi