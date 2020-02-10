const passport = require("passport");
const passportLocal = require("passport-local");
const passportJwt = require("passport-jwt");
const  mongoose = require("mongoose");
const User  = mongoose.model("User");
const { config } =  require("../config/app");

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, async (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `user with ${email} not found.` });
    }
    const success = await user.comparePassword(password);
    if (!success) {
      return done(null, false, { message: "Incorrect password." });
    }
    if (user.is_active === false) {
      return done(null, false, { message: "User Not Activated." });
    }
    process.env.user = user;
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
      done(err, user);
  });
});

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.app.JWT_SECRET,
    },  (jwtToken, done) => {
    User.findOne({ username: jwtToken.username },  (err, user) => {
        if (err) { return done(err, false); }
        if (user) {
            return done(undefined, user , jwtToken);
        } else {
            return done(undefined, false);
        }
    });
}));
