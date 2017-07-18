/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();

const User = require("../models/user");
const Song = require("../models/song");


const SpotifyWebApi = require('spotify-web-api-node');

// SPOTIFY CREDENTIALS TO USE THE API
var clientId = '7c824c4a01474c8fbb1a67de125fffbc',
    clientSecret = '0f6b53915268423ab1116853dd0f644c';
// Create the api object with the credentials
const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
  });

// Function to parse the songs (NOT REPEAT SONGS)
function parseSongs(myArray){ // It receives an array of objects
  let returnArray = [];
  for(var i = 0;i<myArray.length;i++){
    var push = true;
    for(var j = 0;j<myArray.length;j++){
      if(i!== j){
        if(myArray[i].name === myArray[j].name){
          if(returnArray.indexOf(myArray[i])!== -1 || returnArray.indexOf(myArray[j])!== -1){
            push = false;
          }
        }
      }
    }
    if(push){
      returnArray.push(myArray[i]);
    }
  }
  return returnArray;
}


// Retrieve information about the song the user searches
  router.get("/getSong",(req,res,next) => {
    let search = req.query.song;
    spotifyApi.searchTracks(search)
      .then(function(data) {
        // Array which will have objects with the information needed about the song
        let allSongs = [];
        let result = data.body.tracks.items;
        result.forEach((element)=>{
          // If we can play the song
          if(element.preview_url){
            // The object with the information needed about the song
            let myObjectSong = {};
            // Add all the information to the objects
            myObjectSong.preview_url = element.preview_url;
            myObjectSong.id = element.id;
            myObjectSong.name = element.name;

            // information about the artist

            let arrayArtists = [];
            element.artists.forEach((artist) =>{
              let objectArtist = {};
              objectArtist.name = artist.name;
              objectArtist.id = artist.id;
              arrayArtists.push(objectArtist);
            });
            myObjectSong.artists = arrayArtists;

            // Get an image for the artist
            let myImage = element.album.images[0].url;
            myObjectSong.image = myImage;

            // Push the object to the array<
            allSongs.push(myObjectSong);
          }
        });
        allSongs = parseSongs(allSongs);
        res.render("searchresults", {allSongs, username: req.user.username});
      }, function(err) {
        console.error(err);
      });
  });

  //do post
  router.post("/favourites/new",(req,res,next) =>{
    let username = req.user.username;
    const songObject = {
      name: req.body.info.songName,
      image: req.body.info.songImage,
      id_song: req.body.info.songId,
      preview_url: req.body.info.songPreviewUrl,
      artists: [req.body.songArtists],
      artist_id: req.body.info.artistId,
      artist_name: req.body.info.artistName,
      artist_bio: req.body.info.artistBio,
      artist_location: req.body.info.artistLocation,
      artist_locationLabel: req.body.info.artistLocationLabel
    };
    let myFav = req.user.favourites;
    myFav.push(songObject);

    // Instead of updating the username, update the favourites
    User.findOneAndUpdate({username},{$set: {favourites: myFav}}, (err,user) => {
      if(err){
        return next(err);
      }
    });

  });

  router.post("playlist/new", (req,res,next) =>{
    let username = req.user.username;
    const songObject = {
      name: req.body.info.songName,
      image: req.body.info.songImage,
      id_song: req.body.info.songId,
      preview_url: req.body.info.songPreviewUrl,
      artists: [req.body.songArtists],
      artist_id: req.body.info.artistId,
      artist_name: req.body.info.artistName,
      artist_bio: req.body.info.artistBio,
      artist_location: req.body.info.artistLocation,
      artist_locationLabel: req.body.info.artistLocationLabel
    };

     let indexPlaylist = req.body.info.indexPlaylist;

     let myPlaylist = req.user.playLists;
     myPlaylist[index].push(songObject);
     // Instead of updating the username, update the favourites
     User.findOneAndUpdate({username},{$set: {playLists: myPlaylist}}, (err,user) => {
       if(err){
         return next(err);
       }
       else{
       }
     });
   });


 router.post("/history/new/:songId",(req,res,next) =>{
    let username = req.user.username;
    const songObject = {
      name: req.body.info.songName,
      image: req.body.info.songImage,
      id_song: req.body.info.songId,
      preview_url: req.body.info.songPreviewUrl,
      artists: [req.body.songArtists],
      artist_id: req.body.info.artistId,
      artist_name: req.body.info.artistName,
      artist_bio: req.body.info.artistBio,
      artist_location: req.body.info.artistLocation,
      artist_locationLabel: req.body.info.artistLocationLabel
    };

   let myHistory = req.user.history;
   myHistory.push(songObject);
   // Instead of updating the username, update the favourites
   User.findOneAndUpdate({username},{$set: {history: myHistory}}, (err,user) => {
     if(err){
       return next(err);
     }
   });
  });

  router.post("/queue/new",(req,res,next) =>{
    const songObject = {
      name: req.body.info.songName,
      image: req.body.info.songImage,
      id_song: req.body.info.songId,
      preview_url: req.body.info.songPreviewUrl,
      artists: [req.body.songArtists],
      artist_id: req.body.info.artistId,
      artist_name: req.body.info.artistName,
      artist_bio: req.body.info.artistBio,
      artist_location: req.body.info.artistLocation,
      artist_locationLabel: req.body.info.artistLocationLabel
    };
    req.session.myQueue.push(songObject);
    req.session.save();
   });

   function parseArtists(myArray){
     let returnArray = [];
     for(var i = 0;i<myArray.length;i++){
       returnArray.push(parseSongs(myArray[i]));
     }
     return returnArray;
   }

   router.get("/checkSession",(req,res,next) => {
      res.send(req.session);
   });

   router.get("/followed",(req,res,next) => {
     let username = req.user.username;
     let allAlbums = [];
     User.findOne({username},(err,user) => {
       let followingArtists = user.artists;
       if(followingArtists.length === 0){
         res.render("followed", {username: req.user.username, myArray : []} );
       }
       else{
         for(var i = 0,k = 0;i<followingArtists.length;i++){
           let myAlbum = [];
           spotifyApi.getArtistAlbums(followingArtists[i])
             .then(function(data) {
               let result = data.body.items;
               result.forEach((element) => {
               let myObject = {};
               myObject.image = element.images[0].url;
               myObject.name = element.name;
               //myObject.nameArtist = element.artist.name;
               // myObject.artist = element.artists[0];
                myAlbum.push(myObject);
               });
               allAlbums.push(myAlbum);
               k++;
               if(k === followingArtists.length){
                 allAlbums = parseArtists(allAlbums);
                 doneLoopingArtists(allAlbums);
               }
             }, function(err) {
               console.error(err);
            });
        }
       }

    });
    function doneLoopingArtists(myArray){
      res.render("followed", {username: req.user.username, myArray });
    }
  });

  router.post("/artist/new",(req,res,next) => {
    let id_artist = req.body.info.artistId;
    let username = req.user.username;

    let myArtists = req.user.artists;
    myArtists.push(id_artist);

    // Instead of updating the username, update the favourites
    User.findOneAndUpdate({username},{$set: {artists: myArtists}}, (err,user) => {
      if(err){
        return next(err);
      }
        });
  });


  module.exports = router;
