const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const courses = [
  { name: "react", id: 1 },
  { name: "angular", id: 2 },
  { name: "veu", id: 3 },
];

app.get("/", (req, res) => {
  res.send("Hey Howdy!!!!!!!!!!!!!!!, This is the root.");
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

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
