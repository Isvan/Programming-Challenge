var jwt = require('jsonwebtoken');
var validateUser = require('../routes/auth').validateUser;

module.exports = function(req, res, next) {

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token || key) {

    try {
    var decoded = jwt.verify(token, require('../config.js').secret);

      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }

        //Token is valid
          next();

    } catch (err) {

      if(err.name == "JsonWebTokenError"){

        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid Token",
        });

      }else{
        res.status(500);
        res.json({
          "status": 500,
          "message": "Oops something went wrong",
          "error": err
        });
      }
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};
