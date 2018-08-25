let express = require("express");
let router = express.Router();

let Product = require("../models/product");
/* GET home page. */
router.get("/", function(req, res, next) {
  //fetch products from DB
  Product.find({}, (err, docs)=>{
    if (err) {
      console.log('err', err);
    }
    //serve three items at a time
    let productChunks = [];
    let chunkSize = 3;
    for (let i = 0; i < docs.length; i += chunkSize) {
      //will push array of three items into productChunks arr
      productChunks.push(docs.slice(i, i+chunkSize))
    }
    res.render("shop/index", { title: "Shopping Cart", products: productChunks });
  });
});

module.exports = router;
