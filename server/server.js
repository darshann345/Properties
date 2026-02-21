const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const propertyRouter = require("./Router/Property");

require('dotenv').config(); // Load environment variables

const app = express();

// Use environment variable for port (for deployment or local development)
const PORT = process.env.PORT || 5000;

// 🔥 SIMPLE CORS FIX
app.use(cors({
    origin: true,
    credentials: true
}));

// Parse incoming JSON
app.use(express.json());

// MongoDB connection string (use environment variables for sensitive data)
const DB_URL = process.env.DB_URL;

// Connect to MongoDB
mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.error("Error Connecting to DB:", err.message);
        process.exit(1);
    });

// Property routes
app.use("/Property", propertyRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});