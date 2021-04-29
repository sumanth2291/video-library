const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require("Joi");

// Create DB schema
const genresSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  tags: [String],
  date: { type: Date, default: Date.now },
});

// Create a model
const Genre = mongoose.model("Genre", genresSchema);

// Create a schema for validation
const schema = Joi.object({
  name: Joi.string().min(3).max(150).required(),
  genre: Joi.string().min(4).max(15).required(),
});

// Write Server application methods

// Read
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Create
router.post("/", async (req, res) => {
  let genre = new Genre({ name: req.body.name, genre: req.body.genre });
  const result = schema.validate({
    name: req.body.name,
    genre: req.body.genre,
  });

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  genre = await genre.save();
  res.send(genre);
});

// Update
router.put("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    res
      .status(404)
      .send(`The genre with the ID: ${req.params.id} is not found.`);

  res.send(genre);
});

// Delete
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    res
      .status(404)
      .send(`The genre with the ID: ${req.params.id} is not found.`);

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    res
      .status(404)
      .send(`The genre with the ID: ${req.params.id} is not found.`);

  res.send(genre);
});

module.exports = router;
