// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");

const User = require('../models/User');
var cfg = require("../../config/auth.json");

var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
  var strategy = new Strategy(params, async function(payload, done) {

    var _id = payload.id;

    const user = await User.findOne({ _id });

    if (user && !user.bloqueado) {
      return done(null, {id: user._id, name: user.name});
    } else {
      return done(new Error("User not found or blocked"), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};