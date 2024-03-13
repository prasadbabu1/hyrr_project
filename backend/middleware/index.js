const jwt = require("jsonwebtoken")
const loginModel = require("../models/loginModel");


const checkUser = (req, res, next) => {
    const token = req.cookies?.jwt;
    if (token) {
      jwt.verify(token, 'hyrr', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await loginModel.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

  module.exports=checkUser