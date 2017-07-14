const express    = require("express");
const authRoutes = express.Router();
const passport = require("passport");


// User model
const User       = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt     = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/signup", (req, res, next) => {
  res.render("authentication/signup", { layout: "layouts/authentication" });
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("authentication/signup", { message: "Indicate username and password" , layout: "layouts/authentication"});
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("authentication/signup", { message: "The username already exists" ,layout: "layouts/authentication"});
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username: username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("authentication/signup", { message: "Something went wrong", layout: "layouts/authentication" });
      } else {
        res.redirect("/");
      }
    });
  });
});


authRoutes.get("/login", (req, res, next) => {
  res.render("authentication/login", { layout: "layouts/authentication" });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: false,
  passReqToCallback: true
}));

module.exports = authRoutes;