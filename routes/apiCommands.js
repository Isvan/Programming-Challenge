var apiCommands = {

  getInt: function(req, res) {

    //getResult from DB
    console.log("Spoof get INT " + req.body);
    res.json({
      int : 5
    });
  },

  setInt: function(req, res) {

    //Set on DB
    console.log("Spoof set Int " + req.body.newInt);
    JSON.stringify(req.body);
    res.json({
      int : req.body.newInt
    });
  }

};

module.exports = apiCommands;
