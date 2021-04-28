const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const genres = require("./Routes/genres");

// Adding a middleware for request processing
app.use(express.json());
app.use("/api/genres", genres);

// Listen to the server on the localhost
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
