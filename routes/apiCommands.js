var apiCommands = {

  getInt: function(req, res) {

    //getResult from DB
    console.log("Spoof get INT " + req.body);
  },

  setInt: function(req, res) {

    //Set on DB
    console.log("Spoof set Int " + req.body)
  }

};

module.exports = apiCommands;
