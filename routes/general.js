var express = require('express');
var router = express.Router();

//Render main page - history
router.get("/",(req,res,next) => {
  res.render("history");
});

//Render favorites
router.get("/favorites",(req,res,next) => {
  res.render("favorites");
});

//Render playlists
router.get("/playlists",(req,res,next) => {
  res.render("playlists");
});

//Followed artists
router.get("/followed",(req,res,next) => {
  res.render("followed");
});

module.exports = router;