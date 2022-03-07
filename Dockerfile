FROM node:14.19.0-alpine

WORKDIR /fupapp

ENV PATH="./fupapp/node_modules/.bin:$PATH"

COPY . .
RUN npm install

CMD ["npm", "start"]

## COMMANDS
# docker build --tag react .
# docker run --publish 3000:3000 react