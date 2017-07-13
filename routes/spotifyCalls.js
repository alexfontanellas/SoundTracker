/* jshint esversion: 6 */
var express = require('express');
var router = express.Router();
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


  router.get("/mysong",(req,res,next) => {
    spotifyApi.searchTracks('Love')
      .then(function(data) {
        console.log('Search by "Love"', data.body);
      }, function(err) {
        console.error(err);
      });
  });


  module.exports = router;
