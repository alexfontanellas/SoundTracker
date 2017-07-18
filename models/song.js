/* jshint esversion:6 */

const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const Artist = require("./artist");


const songSchema = new Schema({
  name: String,
  image: String,
  id_song: String,
  preview_url: String,
  // If time, create a artist object with all of its info
  artist_id: String,
  artist_name: String,
  artist_bio: String,
  artist_location: String,
  artist_locationLabel: String


}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
