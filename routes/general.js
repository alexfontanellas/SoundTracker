const express = require('express');
const router = express.Router();
const ensureLogin = require("connect-ensure-login");


//Render main page - history
router.get("/", ensureLogin.ensureLoggedIn(), (req,res,next) => {
  res.render("history");
});

//Render search results
router.get("/searchresults", ensureLogin.ensureLoggedIn(), (req,res,next) => {
  res.render("searchresults");
});

//Render search results
router.post("/playsingle", ensureLogin.ensureLoggedIn(), (req,res,next) => {
  console.log('hello');
  let song = req.body.preview;
  res.render("playsingle", { song });
});

//Render queue
router.get("/resultsqueue", ensureLogin.ensureLoggedIn(),(req,res,next) => {
    var musicList = ['https://p.scdn.co/mp3-preview/6ab7825c891d399458e4068940eff436b67ae57b?cid=7c824c4a01474c8fbb1a67de125fffbc',
  'https://p.scdn.co/mp3-preview/74a0da99e8c1452cf915720f783cacefab7a66df?cid=7c824c4a01474c8fbb1a67de125fffbc',
  'https://p.scdn.co/mp3-preview/ce8ace0ec425840416be78db07cf50dd331eed4f?cid=7c824c4a01474c8fbb1a67de125fffbc'];
  res.render("resultsqueue", { musicList } );
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