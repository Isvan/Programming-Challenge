var jwt = require('jsonwebtoken');
var User = require("../database/models/User.js");


//Mongo defualt port 27017

var auth = {

  login: function(req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    auth.checkUser(username,function(found,user){
      if(found){
        //Found the username now to check the password
          user.comparePassword(password,function(err,match){

            if(match){
              //Gen a new token
              var newToken = genToken();

              //Update the DB
              User.findByIdAndUpdate(user.id,{token:newToken.token},function(err,user){
                  if(err) throw err;


              });

              //Send back the token
              res.json(newToken);

            }else{
              res.status(401);
              res.json({
                "status": 401,
                "message": "Invalid credentials"
              });
            }

        });


      }else{

        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;

      }



    });
  },


register: function(req,res) {
  //Add Use to DB and send token

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

      // Do the DB work
      // spoofing the DB response for simplicity

      auth.checkUser(username,function(found){
        if(found){
          res.status(401);
          res.json({
            "status": 401,
            "message": "Username in use"
          });
          return;
        }else{


                var token = genToken();
                //Upload to the Db
                var newUser = User({
                  username:username,
                  password:password,
                  token:token.token,
                  int:0
                })

                var error = null;

                newUser.save(function(err){
                  if(err){
                    throw err;
                  }

                });


                if(error != null){
                  res.status(500);
                  res.json({
                    "status"  : 500,
                    "message" : "Database Error",
                    "err"     : error
                  });
                  return;
                }

                res.json(token);

        }

      });


  },

  checkUser: function(username,cb){

    User.find({username:username}, function(err, user) {
      if (err) throw err;

      if(user.length != 0){
          cb(true,user[0]);
      }else{
          cb(false);
      }

    });

  },
}

// private method
function genToken() {
   // 7 days
  var expires = expiresIn(7);
  var token = jwt.sign({
    exp: expires
  }, require('../config.js').secret);

  return {
    token: token,
    expires: expires
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
