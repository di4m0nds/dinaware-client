FROM node:14.19.0-alpine

WORKDIR /fupapp

ENV PATH="./fupapp/node_modules/.bin:$PATH"

COPY . .
RUN npm install

CMD ["npm", "start"]
