let express = require("express");
let router = express.Router();

let Product = require("../models/product");
let Cart = require("../models/cart");

//ROUTES
/* GET home page. */
router.get("/", function(req, res, next) {
  //show success message if successfull purchase
  let successMsg = req.flash("success")[0];

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
      products: productChunks,
      successMsg: successMsg,
      noMsg: !successMsg
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

//checkout route
router.get("/checkout", (req, res, next)=>{
  if (!req.session.cart) {
    return res.redirect("/shopping-cart")
  }
  let cart = new Cart(req.session.cart);
  //display error message if there is stored err in flash errors arr
  let errMsg = req.flash("error")[0]; 
  res.render("shop/checkout", { total: cart.totalPrice, errMsg: errMsg, noError: !errMsg})
}) 
//checkout post - charge
router.post("/checkout", (req, res, next)=>{
  if (!req.session.cart) {
    return res.redirect("/shopping-cart")
  }
  let cart = new Cart(req.session.cart);

  let stripe = require("stripe")("sk_test_8sd2Y7L3FiTLwEbHaFgg45yY");

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Charge for video game on afta.com"
  }, function(err, charge) {
    // asynchronously called
    if (err) {
      req.flash("error", err.message)
      return res.redirect("/checkout")
    }
    req.flash("success", "Your purchase was successful");
    req.session.cart = null;
    res.redirect("/")
  });




}) 

module.exports = router;
