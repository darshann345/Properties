const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const propertyRouter = require("./Router/Property");

require('dotenv').config(); // Load environment variables

const app = express();

// Use environment variable for port (for deployment or local development)
const PORT = process.env.PORT || 5000;

// CORS configuration to allow requests from both local and production
const allowedOrigins = [
    "http://localhost:3000", // React app running locally
    "https://your-vercel-url.vercel.app", // Your Vercel frontend URL
    "https://properties-bcw2.onrender.com", // Example backend (for other deployments)
];

// Enable CORS for the allowed origins
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);

// Parse incoming JSON
app.use(express.json());

// MongoDB connection string (use environment variables for sensitive data)
const DB_URL = process.env.DB_URL; // Now using environment variable

// Connect to MongoDB
mongoose
    .connect(DB_URL) // no deprecated options like useNewUrlParser or useUnifiedTopology
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