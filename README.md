# Phonebook Fullstack Application

This is a full-stack phonebook application built as part of the Full Stack Open course curriculum. The application allows users to manage a list of contacts with names and phone numbers.

## Features

- **View** a list of all phonebook entries.
- **Add** new entries with name and phone number validation.
- **Delete** existing entries with confirmation.
- **Update** the phone number for an existing entry.
- **Filter** the list of entries in real-time.
- **Notifications** for successful operations and errors.
- **Full-Stack Integration**: A React frontend served by a Node.js/Express backend.
- **Database Persistence**: Data is stored and managed in a MongoDB Atlas cloud database.

## Tech Stack

**Frontend:**
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A modern frontend build tool for fast development.
- **Axios**: A promise-based HTTP client for making API requests.

**Backend:**
- **Node.js**: A JavaScript runtime environment.
- **Express**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL document database.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **dotenv**: A module to load environment variables from a `.env` file.
- **CORS**: A middleware for enabling Cross-Origin Resource Sharing.
- **Morgan**: An HTTP request logger middleware.

## Live Demo

A live version of this application is deployed on Render:
**(https://temp-phonebook.onrender.com/)** 

## Setup and Run Locally

To run this project on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/)
- A MongoDB Atlas account and a connection URI.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/linz-shen/phonebook-fullstack.git
    cd phonebook-fullstack
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your MongoDB connection string:
    ```
    MONGODB_URI=your_mongodb_connection_string
    PORT=3001
    ```

4.  **Run the application:**
    The server will start, typically on `http://localhost:3001`.
    ```bash
    npm start
    ```

## API Endpoints

The backend exposes the following RESTful API endpoints:

| Method | Endpoint          | Description                             |
|--------|-------------------|-----------------------------------------|
| `GET`    | `/api/persons`    | Get all persons.                        |
| `GET`    | `/api/persons/:id`| Get a single person by ID.              |
| `POST`   | `/api/persons`    | Add a new person.                       |
| `PUT`    | `/api/persons/:id`| Update an existing person's number.     |
| `DELETE` | `/api/persons/:id`| Delete a person by ID.                  |
| `GET`    | `/info`           | Get metadata about the phonebook.       |


---
*This project was created by [Linz Shen] as part of the [Full Stack Open](https://fullstackopen.com/) course.*