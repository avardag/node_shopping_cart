let express = require("express");
let router = express.Router();

let Product = require("../models/product");
let Cart = require("../models/cart");

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

router.get("/add-to-cart/:id", (req, res, next)=>{
  let productId = req.params.id;
  //create new Cart instance,  if it exists pass old cart from session
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, foundProduct)=>{
    if (err) {
      console.log('err', err);
      return res.redirect("/");
    }
    //add found product to cart instance and session store
    cart.add(foundProduct, foundProduct.id);
    //set session cart variable 2b cart with added products
    req.session.cart = cart;
    res.redirect("/")
  })
})
//Shopping cart route
router.get("/shopping-cart", (req, res, next)=>{
  if (!req.session.cart) {
    return res.render("shop/shopping-cart", {products: null})
  }
  let cart = new Cart(req.session.cart);
  res.render("shop/shopping-cart", {products: cart.generateArray(), totalPrice: cart.totalPrice})
  
})

module.exports = router;
