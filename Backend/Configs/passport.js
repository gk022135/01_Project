const passport = require("passport");

// importing strategy = registering it
require("./google.strategy.js");

// optional: future strategies
// require("./jwt.strategy.js");
// require("./github.strategy.js");

module.exports = passport;