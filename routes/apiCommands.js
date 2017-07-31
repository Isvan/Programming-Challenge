var User = require("../database/models/User.js");

var apiCommands = {

  getInt: function(req, res) {


    //See who the token belongs too then
    //get current int from DB increase by one,
    //Store in db
    //Send to user

    User.findOne({token:req.body.access_token}, function(err, user) {
    if (err) throw err;

    if(user){
        user.int = user.int + 1;
        res.status(200);
        res.json(
          {"data": {
            "int":  user.int
          }}
        );

      user.save(function(err) {
        if (err) throw err;

      });

    }else{
      res.status(401);
      res.json({
        "status": 401,
        "message": "Outdated/Invalid Token"
      });
    }


  });


  },

  setInt: function(req, res) {

    var intToStore = (req.body.newInt);

    //Its negative thats a no go
    if(!Number.isInteger(intToStore) || intToStore < 0){
      console.log("Bad int : " + intToStore);
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid Int"
      });

      return;
    }

    //See who the token belongs too then update

        User.findOne({token:req.body.access_token}, function(err, user) {
        if (err) throw err;

        if(user){
            user.int = intToStore
          res.status(200);
          res.json(
            {"data": {
              "int":  user.int
            }}
          );
          user.save(function(err) {
            if (err) throw err;

          });

        }else{
          res.status(401);
          res.json({
            "status": 401,
            "message": "Outdated/Invalid Token"
          });
        }


      });
  }

};

module.exports = apiCommands;
