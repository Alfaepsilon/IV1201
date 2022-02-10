'use strict';

const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '..');
const express = require('express');
const cookieParser = require('cookie-parser');
const {Login} = require('../src/controller/Controller')
const result = require('dotenv-safe').config({
  path: path.join(APP_ROOT_DIR, '.env'),
  example: path.join(APP_ROOT_DIR, '.env'),
  allowEmptyValues: true
});

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser());

app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

app.get('/', (req, res) => {
  return res.render('login')
});
app.post('/auth', (req, res) => {
  console.log(req.body)
  var json = {
    user: req.body.username,
    pass: req.body.password
  }
  Login(req.body.username,req.body.password)
  res.json(json)
  // res.send(`Welcome ${req.body.username} to the API`);
});

/*const reqHandlerLoader = require('./api');
reqHandlerLoader.loadHandlers(app);
reqHandlerLoader.loadErrorHandlers(app);*/

const server = app.listen(
    process.env.SERVER_PORT,
    process.env.SERVER_HOST,
    () => {
      console.log(
          `Server is up at ${server.address().address}:${server.address().port}`
      );
    }
);

module.exports = server; // Needed for tests.