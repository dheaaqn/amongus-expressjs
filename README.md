<h1 align="center">ExpressJS - Among Us RESTfull API</h1>

Among us is REST API for among us realtime chat app. Simple application to CRUD database with NodeJS, Express, and MySql.
This application use JWT to authentication and authorization. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database host
DB_USER=root // Database Username
DB_PASS= // Database Password
DB_NAME=telegram_backend // Your Database Name

PORT=3000
IP=127.0.0.1
```

## End Point

Postman <a href="https://documenter.getpostman.com/view/6648790/TVRrV4du">Collection</a>

## Run the app

Development mode

```bash
$ npm run dev
```

Deploy mode

```bash
$ npm start
```
