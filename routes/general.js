const express = require('express');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");


//Render main page - history
router.get("/", ensureLogin.ensureLoggedIn(), (req,res,next) => {
  res.render("history");
});

//Render search results
router.get("/resultsqueue", ensureLogin.ensureLoggedIn(),(req,res,next) => {
  res.render("resultsqueue");
});

//Render favorites
router.get("/favorites",  ensureLogin.ensureLoggedIn(),(req,res,next) => {
  res.render("favorites");
});

//Render playlists
router.get("/playlists",  ensureLogin.ensureLoggedIn(),(req,res,next) => {
  res.render("playlists");
});

//Followed artists
router.get("/followed",  ensureLogin.ensureLoggedIn(), (req,res,next) => {
  res.render("followed");
});

module.exports = router;