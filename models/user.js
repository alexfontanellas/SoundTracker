/* jshint esversion:6 */
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const Song = require("./song");
const Artist = require("./artist");
const Playlist = require("./playlist");



const userSchema = new Schema({
  username: String,
  password: String,
  history: [Song.schema],
  favourites: [Song.schema],
  artists: [String],
  //artists: [Artist.schema],
  playLists: [Playlist.schema],
  queue: [Song.schema]
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
