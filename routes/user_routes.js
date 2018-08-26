let express = require("express");
let router = express.Router();
let csrf = require("csurf");
let passport = require("passport");

let csrfProtection = csrf();
//use csrfProtection MW for all roues
router.use(csrfProtection);


//ROUTES

router.get("/signup", function(req, res) {
  // pass flash messages
  let messages = req.flash("error");
  // pass the csrfToken to the view
  res.render("user/signup", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

//POST signup rote with passport authentication
router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup",
    failureFlash: true
  })
);

//SIGNIN GET route
router.get("/signin", function(req, res) {
  // pass flash messages
  let messages = req.flash("error");
  // pass the csrfToken to the view
  res.render("user/signin", {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

// SIGNIN POST route with passport authentication
router.post(
  "/signin",
  passport.authenticate("local.signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin",
    failureFlash: true
  })
);

//PROFILE route
router.get("/profile", isLoggedIn, function(req, res) {
  res.render("user/profile");
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { //isAuthenticated -> method from passport
    return next();
  }
  res.redirect("/");
}