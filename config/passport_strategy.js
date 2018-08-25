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
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          //if user already exists
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
          return done(null, result);
        });
      });
    }
  )
);
