/* jshint esversion:6 */

const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const Song = require("./song");


const playListSchema = new Schema({
  lists: [Song.schema]

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Playlist = mongoose.model("Playlist", playListSchema);

module.exports = Playlist;
