/* jshint esversion:6 */

const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  id_artist : String,
  bio: String,
  location: String



}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
