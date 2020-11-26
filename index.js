const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const courses = [
  { name: "react", id: 1 },
  { name: "angular", id: 2 },
  { name: "veu", id: 3 },
];

app.get("/", (req, res) => {
  res.send("Hey, This is the root of the application.");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((course) => {
    return course.id === parseInt(req.params.id);
  });
  if (!course) res.status(404).send("No courses found on this ID");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const course = {
    name: req.body.name,
    id: courses.length + 1,
  };
  courses.push(course);
  res.send(courses);
});

app.put("/api/courses/:id", (req, res) => {
  // Find the course if it exists. If not return 404
  const course = courses.find((course) => {
    return course.id === parseInt(req.params.id);
  });
  if (!course)
    return res
      .status(404)
      .send(`The course with id: ${req.params.id} does not exists`);

  // Validate the course, if not valid return 400 Bad request
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate({ name: req.body.name });
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // Update the course
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Find the course if it exists. If not return 404
  const course = courses.find((course) => {
    return course.id === parseInt(req.params.id);
  });
  if (!course)
    return res
      .status(404)
      .send(`The course with id: ${req.params.id} does not exists`);

  // Delete the course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return response
  res.send(course);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
