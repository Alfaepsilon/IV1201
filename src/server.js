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

app.get('/', async (req, res) => {
  // await this.Controller.register("Johan", "J", "a", 2, "awd", "awd", 2)
  return res.render('login', { isregisterd: false })
});

app.post('/signUp', async (req, res) => {

  var user = {
    name: req.body.fname,
    surname: req.body.lname,
    pnr: req.body.pn,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    role_id: 2
  };

  var isregisterd = await this.Controller.register(user)
  if (isregisterd) {
    return res.render('login', { isregisterd: isregisterd })
  } else {
    return res.render('signUp', { errorMsg: true })
  }
});

app.get('/signUp', (req, res) => {
  return res.render('signUp', { errorMsg: false })
});

app.post('/auth', async (req, res) => {
  // console.log(req.body)
  var json = {
    user: req.body.username,
    pass: req.body.password
  }
  var loggedIn = await this.Controller.login(req.body.username, req.body.password)

  // res.json(json);
  return res.render('dummyView', { loggedIn: loggedIn })

  // res.send(`Welcome ${req.body.username} to the API`);
});
/*const reqHandlerLoader = require('./api');
reqHandlerLoader.loadHandlers(app);
reqHandlerLoader.loadErrorHandlers(app);*/

var port = process.env.PORT || process.env.SERVER_PORT
const server = app.listen(
  port,
  process.env.SERVER_HOST,
  () => {
    console.log(
      `Server is up at ${server.address().address}:${server.address().port}`
    );
  }
);

module.exports = server; // Needed for tests.
