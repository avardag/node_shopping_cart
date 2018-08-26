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

router.get("/profile", function(req, res) {
  res.render("user/profile");
});
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

module.exports = router;