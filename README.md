# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install` or `npm install` for install all dependencies

then

### `yarn start` or `npm run` for run the application

Runs the app in the development mode.\

## If you got >14.18 version of Node

You need to install docker and run the next commands:

```bash
  docker build --tag react .
```
then
```bash
docker run --publish 3000:3000 react
```
And finally is running on port 3000.
