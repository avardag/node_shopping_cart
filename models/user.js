let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  email: { type: String, required: true }
});

let User = mongoose.model("User", userSchema);

module.exports = User;
