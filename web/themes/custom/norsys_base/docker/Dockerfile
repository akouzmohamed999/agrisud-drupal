FROM node:14.17.3-alpine3.13

# Install Gulp globally
# For using gulp command in terminal
RUN npm install -g gulp

WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
