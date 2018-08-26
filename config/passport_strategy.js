let passport = require("passport");
let User = require("../models/user");
let LocalStrategy = require("passport-local").Strategy;

//store or retrive user during session
passport.serializeUser((user, done) => {
  //store user in a session
  done(null, user.id); //serialize by id
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

//create new user strategy

//SIGNUP strategy
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      //first validate body by expressValidator
      req.checkBody("email", "Invalid email").notEmpty().isEmail();
      req.checkBody("password", "Invalid password").notEmpty().isLength({min: 6});
      let errors = req.validationErrors();
      if (errors) {
        let messages = errors.map((error)=>{
          return error.msg;
        });
        //done(error=null, isSuccessful=false, otherArg)
        return done(null, false, req.flash("error", messages))
      }

      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          //if user already exists
          //done(error=null, isSuccessful=false, otherArg)
          return done(null, false, { message: "Email already in use" });
        }
        let newUser = new User();
        newUser.email = email;
        let newpass = newUser.encryptPassword(password);
        newUser.password = newpass; //use custom middlware from Usr model
        
        newUser.save((err, result) => {
          if (err) {
            return done(err);
          }
          return done(null, result);//done(error=null, argOnSuccess=result)
        });
      });
    }
  )
);
//SIGNIN strategy
passport.use("local.signin", new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    }, (req, email, password, done)=>{
      //first validate body by expressValidator
      req.checkBody("email", "Invalid email").notEmpty().isEmail();
      req.checkBody("password", "Invalid password").notEmpty();
      let errors = req.validationErrors();
      if (errors) {
        let messages = errors.map((error)=>{
          return error.msg;
        });
        //done(error=null, isSuccessful=false, otherArg)
        return done(null, false, req.flash("error", messages))
      }

      User.findOne({ email: email }, (err, foundUser) => {
        if (err) {
          return done(err);
        }
        //if no user with passed email is found
        if (!foundUser) {
          return done(null, false, { message: "No user found" });
        }
        //if password doesnt match
        if (!foundUser.validPassword(password)) { //validPassword -> custom MW from mongoose
          return done(null, false, { message: "Wrong password" });
        }
        return done(null, foundUser)
      });
    }
  )
)