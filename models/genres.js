const mongoose = require("mongoose");
const Joi = require("Joi");

// Create a schema for validation
const validateGenres = Joi.object({
  genre: Joi.string().min(4).max(15).required(),
});

// Create DB schema
const genresSchema = new mongoose.Schema({
  genre: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Create a model
const Genre = mongoose.model("Genre", genresSchema);

exports.Genre = Genre;
exports.validateGenres = validateGenres;
exports.genresSchema = genresSchema;
