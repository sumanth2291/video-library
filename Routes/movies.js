const express = require("express");
const router = express.Router();
const { Movie, validateMovies } = require("../models/movies");
const { Genre } = require("../models/genres");

// Write Server application methods

// Read
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

// Create
router.post("/", async (req, res) => {
  const result = validateMovies.validate({
    title: req.body.title,
    genreId: req.body.genreId,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre ID..");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      genre: genre.genre,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  res.send(movie);
});

// Update
router.put("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    res
      .status(404)
      .send(`The genre with the ID: ${req.params.id} is not found.`);

  res.send(movie);
});

// Delete
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    res
      .status(404)
      .send(`The genre with the ID: ${req.params.id} is not found.`);

  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    res
      .status(404)
      .send(`The genre with the ID: ${req.params.id} is not found.`);

  res.send(movie);
});

module.exports = router;
