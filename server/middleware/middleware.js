const Config = require('../services/config')
const config = Config.load();
const jwt = require("jsonwebtoken");

exports.validateToken = async function (req, res, next){

    const authorizationHeader = req.headers.authorization;
    let result = '';
    if (authorizationHeader) {
      const token = req.headers.authorization.split(' ')[1]; 
      try {
        result = jwt.verify(token,config.email.token_key);

        req.decoded = result;
        
        next();
      } catch (err) {
        throw new Error(err);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }

