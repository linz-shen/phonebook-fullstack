import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Person from "./models/person.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

// Morgan logging (with request body if present)
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

// Routes
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  const person = new Person({ name, number });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { number },
    { new: true, runValidators: true, context: "query" },
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: "person not found" });
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "person not found" });
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(
        `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`,
      );
    })
    .catch((error) => next(error));
});

// Fallback route to serve frontend for non-API requests
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Error handler middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.code === 11000) {
    // duplicate key
    return res.status(400).json({ error: "Name must be unique" });
  }

  next(error);
};
app.use(errorHandler);

// Connect to MongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");

    // Start server only after DB is connected
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });
