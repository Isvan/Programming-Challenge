var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

mongoose.Promise = global.Promise;

var userSchema  = new Schema({
  username  : String,
  password  : String,
  token     : String,
  int       : Number
});


//Before we send anythign to the db check the password for changes and apply salt as needed
userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

//Get a salted password and comepare it with a give
userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User',userSchema);
