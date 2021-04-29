const express = require("express");
const router = express.Router();
const { Genre, validateGenres } = require("../models/genres");

// Write Server application methods

// Read
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("genre");
  res.send(genres);
});

// Create
router.post("/", async (req, res) => {
  let genre = new Genre({ genre: req.body.genre });
  const result = validateGenres.validate({
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
    { genre: req.body.genre },
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
