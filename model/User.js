var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/notesource');
var config = require('../config');
mongoose.connect(config.dbURI);
var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  fname: { type: String, default: "" },
  lname: { type: String, default: "" },
  university: String,
  faculty: String,
  oauthID : { type: Number, default: "" },
  created : { type : Date, default : Date.now }
});
var User = mongoose.model('users', userSchema);//collections 'users'
module.exports = User;
