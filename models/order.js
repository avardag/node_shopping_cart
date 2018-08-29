var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  //add user from user model
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: { type: Object, required: true },
  address: {type: String, required: true},
  name: {type: String, required: true},
  paymentId: {type: String, required: true},
});

var Order = mongoose.model("Order", orderSchema);

module.exports = Order;
