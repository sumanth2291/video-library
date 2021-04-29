const mongoose = require("mongoose");
const Joi = require("Joi");
const genresSchema = require("./genres");

// Create a schema for validation
const validateMovies = Joi.object({
  title: Joi.string().min(3).max(150).required(),
  genreId: Joi.string().required(),
  numbeInStock: Joi.number().min(0).required(),
  dailyRentalRate: Joi.number().min(0).required(),
});

// Create DB schema
const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 150,
  },
  genre: { type: genresSchema, required: true },
  numbeInStock: { type: Number, required: true, minlength: 0, maxlength: 255 },
  dailyRentalRate: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 255,
  },
  date: { type: Date, default: Date.now },
});

// Create a model
const Movie = mongoose.model("Movie", moviesSchema);

exports.Movie = Movie;
exports.validateMovies = validateMovies;
