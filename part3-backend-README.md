# Part 3: Phonebook Backend

This directory contains the source code for the backend server of the Phonebook Fullstack Application, developed for Part 3 of the Full Stack Open course.

## Project Overview

The backend is built with Node.js and Express. It serves a RESTful API for managing phonebook entries and also hosts the static production build of the React frontend.

## Key Learning Objectives Achieved

- **Node.js & Express**: Setting up an Express server, defining routes, and handling HTTP requests (`GET`, `POST`, `PUT`, `DELETE`).
- **Middleware**: Implementing and using middleware for logging (`morgan`), parsing JSON bodies (`express.json`), handling CORS, and serving static files.
- **RESTful API Design**: Designing and implementing a REST API according to best practices.
- **MongoDB & Mongoose**: Connecting to a cloud MongoDB Atlas database, defining data schemas and models with Mongoose, and performing CRUD operations.
- **Validation**: Implementing server-side data validation for names and phone numbers.
- **Error Handling**: Creating a centralized error handling middleware to manage different types of errors (e.g., CastError, ValidationError).
- **Environment Variables**: Managing sensitive information like database connection strings using `.env` files.
- **Full-Stack Deployment**: Preparing the backend to serve the frontend build and deploying the entire application to a cloud platform like Render.

## File Structure

- `index.js`: The main entry point of the Express application. It sets up middleware, defines routes, and connects to the database.
- `models/person.js`: Defines the Mongoose schema and model for a `Person`, including data validation rules.
- `package.json`: Lists project dependencies and scripts.
- `.gitignore`: Specifies which files and directories should be ignored by Git.
- `dist/`: Contains the production build of the React frontend, which is served statically by this backend.