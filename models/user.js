var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
      type: String,
        required: true
    },
    lastname: {
      type: String,
        required: true
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
});
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);