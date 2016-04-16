const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;
const FB = require("fb");

const Config = require("./config");
const routes = require("./routes/index");
const users = require("./routes/users");
const bots = require("./routes/bots");
const facebook = require("./routes/facebook");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

const config = new Config();
passport.use(new Strategy({
    clientID: "888460181265335",
    clientSecret: "ee56042bfc0e96e38ed248b2a99bdc61",
    callbackURL: `${config.host}/auth/facebook/callback`
  },
  (accessToken, refreshToken, profile, cb) => {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    FB.setAccessToken(accessToken);
    return cb(null, profile);
  }));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/users", users);
app.use("/bots", bots);
app.use("/facebook", facebook);


app.get("/auth/facebook",
  passport.authenticate("facebook"));

app.get("/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login/facebook" }),
  (req, res) => {
    res.redirect("/facebook/me");
  });
// app.use("/facebook", facebook);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});


module.exports = app;
