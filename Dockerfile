FROM node:12.13-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install glob rimraf
RUN npm --force install

COPY . .

RUN npm run build