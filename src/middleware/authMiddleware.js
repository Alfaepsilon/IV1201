const jwt = require("jsonwebtoken");

/**
 * Kollar om en token är verifierad.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                if (err.message == "jwt expired") {
                    res.clearCookie('jwt');
                }
                res.redirect("/");
            } else {
                console.log(decodedToken);
                let user = await decodedToken.id;
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        res.redirect("/");
    }
};
/**
 * Kollar om token är verifierad
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const notRequireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                if (err.message == "jwt expired") {
                    res.clearCookie('jwt');
                }
                res.locals.user = null;
                next();
            } else {
                let user = await decodedToken.id;
                res.locals.user = user;
                res.redirect("/auth");
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { requireAuth, notRequireAuth };