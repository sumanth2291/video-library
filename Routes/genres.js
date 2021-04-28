const express = require("express");
const router = express.Router();
const Joi = require("Joi");

// Create default list of Genres
const genres = [
  { name: "Action", id: 1 },
  { name: "Comedy", id: 2 },
  { name: "History", id: 3 },
  { name: "Horror", id: 4 },
  { name: "Sci-Fi", id: 5 },
];

// Create a schema for validation
const schema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  id: Joi.number().min(1),
});

// Write Server application methods
// Create
router.post("/", (req, res) => {
  const genre = { name: req.body.name, id: genres.length + 1 };
  const result = schema.validate({ name: req.body.name });

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  genres.push(genre);
  res.send(genres);
});

// Update
router.put("/:id", (req, res) => {
  const genre = genres.find((genre) => {
    return genre.id === parseInt(req.params.id);
  });
  if (!genre)
    res
      .status(404)
      .send(`The genre with the ID: ${req.params.id} is not found.`);

  genre.name = req.body.name;
  res.send(genres);
});

// Read
router.get("/", (req, res) => {
  res.send(genres);
});

// Delete
router.delete("/:id", (req, res) => {
  const genre = genres.find((genre) => {
    return genre.id === parseInt(req.params.id);
  });
  if (!genre)
    res
      .status(404)
      .send(`The genre with the ID: ${req.params.id} is not found.`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});

module.exports = router;
