'use strict';

const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '..');
const express = require('express');
const jwt = require('jsonwebtoken');


const bodyParser = require('body-parser');
const { Console } = require('console');

const cookieParser = require('cookie-parser');
const Controller = require('./controller/Controller').Controller;
const { requireAuth , notRequireAuth } = require('./middleware/authMiddleware');

const result = require('dotenv-safe').config({
  path: path.join(APP_ROOT_DIR, '.env'),
  example: path.join(APP_ROOT_DIR, '.env'),
  allowEmptyValues: true
});

const app = express();
// this.Controller = new Controller();
// this.Authorization = new Authorization();

app.use(bodyParser.json());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());

app.use(express.static(path.join(APP_ROOT_DIR, 'public')));

// this.Controller.updateDefault();

// ============================================
// create json web token
//TO test what happend when jwt expire change expiresIn to (for example) 5 sec
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};
// ============================================

app.get('/', notRequireAuth, async (req, res) => {
  try {
    this.Controller = new Controller();
    await this.Controller.updateDefault();
    return res.render('login',{isregisterd:false, isUser:true})
  } catch (error) {
    res.render('error',{err:error})
    console.log('BAD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  } 

  // await this.Controller.register("Johan", "J", "a", 2, "awd", "awd", 2)
  // return res.render('login',{isregisterd:false})
});

app.get('/logOut',requireAuth, async (req, res) => {
  res.clearCookie('jwt');
  // res.cookie('jwt', '', { maxAge: 1 });
  return res.redirect('/');
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
  
  var isregisterd =  await this.Controller.register(user)
  if (isregisterd){
    return res.render('login',{isregisterd:isregisterd,isUser:true})
  }else{
    return res.render('signUp',{errorMsg:true})
  }
});

app.get('/signUp', notRequireAuth, (req, res) => {
  return res.render('signUp',{errorMsg:false})
});

app.get('/auth', requireAuth, async (req, res) => {
  res.render('dummyView')
});


app.post('/auth', async (req, res) => {
  // console.log(req.body)

  try {
    var isUser = await this.Controller.login(req.body.username, req.body.password)
    if (isUser){
      const token = createToken(req.body.username);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.redirect('/')
    }else{
      res.render('login',{isregisterd:false,isUser:isUser})
    }
    
  }
  catch(err) {
    res.render('error', {err: err})
  }

});

app.get('*', function(req, res) {
  res.render('error', {err: 'There is no such end-point!'})
});

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