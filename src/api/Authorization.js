'use strict';

const { redirect } = require('express/lib/response');
const jwt = require('jsonwebtoken');
//add error handler as a parameter later just like the github
//add jsdoc
class Authorization {
    async signLogin(req, res){
        const token = jwt.sign(
            {username: req.body.username, password: req.body.password},
            process.env.JWT_SECRET,
            {expiresIn: '1 minutes'});
        res.cookie('authCookie', token);
    }
    async authLogin(controller, req, res){
        const cookie = req.cookies.authCookie;
        if(!cookie){console.log("null cookie"); return false;}
        jwt.verify(cookie, process.env.JWT_SECRET, 
        (err, result) => {/*return res.status(200).send({ err: err, result: result, });*/
        if(!err)
        {
            const loggedIn = controller.login(req.body.username, req.body.password);
            if(loggedIn)
            {
                return true;
            }
            else
            {
                console.log("user doesn't exist");
                return false;
            }
        }
        else
        {
            console.log(err);
            res.clearCookie('authCookie');
            this.signLogin(req, res);
            return false;
        }
        });
    }
}

module.exports = { Authorization: Authorization, signLogin: Authorization.signLogin, authLogin: Authorization.authlogin};