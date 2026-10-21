
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let students = [
  { id: 1, name: "Ruben", course: "BSIT", year: 3 },
  { id: 2, name: "Albhend", course: "BSIT", year: 3  }
];

let nextId = 3;

app.get("/", (req, res) => {
  res.json({ message: "Student Records API is running!" });
});

app.get("/api/students", (req, res) => {
  res.status(200).json(students);
});

app.get("/api/students/:id", (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.status(200).json(student);
});

app.post("/api/students", (req, res) => {
  const { name, course, year } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof course !== "string" || !course.trim() ||
    !Number.isInteger(year) || year < 1 || year > 5
  ) {
    return res.status(400).json({
      message: "Name, course, and a valid year (1-5) are required"
    });
  }

  const student = {
    id: nextId++,
    name: name.trim(),
    course: course.trim(),
    year
  };

  students.push(student);
  res.status(201).json(student);
});

app.put("/api/students/:id", (req, res) => {
  const student = students.find(
    s => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const { name, course, year } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof course !== "string" || !course.trim() ||
    !Number.isInteger(year) || year < 1 || year > 5
  ) {
    return res.status(400).json({
      message: "Name, course, and a valid year (1-5) are required"
    });
  }

  student.name = name.trim();
  student.course = course.trim();
  student.year = year;

  res.status(200).json(student);
});

app.delete("/api/students/:id", (req, res) => {
  const index = students.findIndex(
    s => s.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const deleted = students.splice(index, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deleted
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON request body"
    });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
