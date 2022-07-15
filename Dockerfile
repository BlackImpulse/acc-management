FROM node:12.13-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
ADD . ./
RUN npm install

RUN npm run build