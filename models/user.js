let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

//user models middlewares
userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.validPassword = function (password) {
  //check if passed password arg is equal to password in database
  return bcrypt.compareSync(password, this.password);
}


let User = mongoose.model("User", userSchema);

module.exports = User;
