// Create an Express server
const express = require("express");
const Logger = require("./logger");
const logger = new Logger();
const auth = require("./authenticator");
const Joi = require("Joi");
const app = express();
const port = 8000;

app.use(express.json()); // Adding a middleware for request processing
// app.use(auth);

logger.on('logMessage', (arg) => {
  console.log('Listener called', arg);
})

logger.log("The log method in Logger class is running...")

app.get("/", (req, res) => {
  res.send("This is the root page of Video Library service");
});

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
app.post("/api/genres", (req, res) => {
  const genre = { name: req.body.name, id: genres.length + 1 };
  const result = schema.validate({ name: req.body.name });

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  genres.push(genre);

  res.send(genres);
});
// Update
app.put("/api/genres/:id", (req, res) => {
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
app.get("/api/genres", (req, res) => {
  res.send(genres);
});
// Delete
app.delete("/api/genres/:id", (req, res) => {
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

// Listen to the server on the localhost
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
