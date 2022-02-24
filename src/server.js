'use strict';

const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '..');
const express = require('express');
const cookieParser = require('cookie-parser');
const Controller = require('./controller/Controller').Controller;
const result = require('dotenv-safe').config({
  path: path.join(APP_ROOT_DIR, '.env'),
  example: path.join(APP_ROOT_DIR, '.env'),
  allowEmptyValues: true
});

const app = express();
this.Controller = new Controller();

const bodyParser = require('body-parser');
const { Console } = require('console');
app.use(bodyParser.json());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());

app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

app.get('/', (req, res) => {
  this.Controller.register("Johan", "J", "a", 2, "awd", "awd", 2)
  return res.render('login')
});
app.post('/auth', (req, res) => {
  console.log(req.body)
  var json = {
    user: req.body.username,
    pass: req.body.password
  }
  var loggedIn = this.Controller.login(req.body.username, req.body.password)
  console.log(loggedIn);
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