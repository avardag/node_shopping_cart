let express = require("express");
let router = express.Router();
let csrf = require("csurf");

let csrfProtection = csrf();
//use csrfProtection MW for all roues
router.use(csrfProtection);


let Product = require("../models/product");

//ROUTES
/* GET home page. */
router.get("/", function(req, res, next) {
  //fetch products from DB
  Product.find({}, (err, docs) => {
    if (err) {
      console.log("err", err);
    }
    //serve three items at a time
    let productChunks = [];
    let chunkSize = 3;
    for (let i = 0; i < docs.length; i += chunkSize) {
      //will push array of three items into productChunks arr
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render("shop/index", {
      title: "Shopping Cart",
      products: productChunks
    });
  });
});

router.get("/user/signup", function(req, res) {
  // pass the csrfToken to the view
  res.render("user/signup", { csrfToken: req.csrfToken() });
});

router.post("/user/signup", function(req, res) {
  // pass the csrfToken to the view
  res.redirect("/");
});


module.exports = router;
