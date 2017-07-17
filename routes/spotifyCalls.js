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
  console.log(returnArray[0].artists[0]);
  return returnArray;
}


// Retrieve information about the song the user searches
  router.get("/getSong",(req,res,next) => {
    let search = req.query.song;
    console.log(search);
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
      else{
        console.log("updated");
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
      artist_name: req.body.info.artistName,
      artist_bio: req.body.info.artistBio,
      artist_location: req.body.info.artistLocation,
      artist_locationLabel: req.body.info.artistLocationLabel
    };

     let indexPlaylist = req.params.index;

     let myPlaylist = req.user.playLists;
     myPlaylist[index].push(songObject);
     // Instead of updating the username, update the favourites
     User.findOneAndUpdate({username},{$set: {playLists: myPlaylist}}, (err,user) => {
       if(err){
         return next(err);
       }
       else{
         console.log("updated");
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
     else{
       console.log("updated");
     }
   });
  });

  router.post("/queue/new/:songId",(req,res,next) =>{
    let username = req.user.username;
    const songObject = {
      name: req.body.info.songName,
      image: req.body.info.songImage,
      id_song: req.body.info.songId,
      preview_url: req.body.info.songPreviewUrl,
      artists: [req.body.songArtists],
      artist_name: req.body.info.artistName,
      artist_bio: req.body.info.artistBio,
      artist_location: req.body.info.artistLocation,
      artist_locationLabel: req.body.info.artistLocationLabel
    };

     let myQueue = req.user.queue;
     myQueue.push(songObject);
     // Instead of updating the username, update the favourites
     User.findOneAndUpdate({username},{$set: {queue: myQueue}}, (err,user) => {
       if(err){
         return next(err);
       }
       else{
         console.log("updated");
       }
     });
   });

  module.exports = router;