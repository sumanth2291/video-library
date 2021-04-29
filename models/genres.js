const mongoose = require("mongoose");
const Joi = require("Joi");

// Create a schema for validation
const schema = Joi.object({
  name: Joi.string().min(3).max(150).required(),
  genre: Joi.string().min(4).max(15).required(),
});

// Create DB schema
const genresSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  tags: [String],
  date: { type: Date, default: Date.now },
});

// Create a model
const Genre = mongoose.model("Genre", genresSchema);

exports.Genre = Genre;
exports.schema = schema;
