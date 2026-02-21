const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const propertyRouter = require("./Router/Property");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS properly configured
const corsOptions = {
    origin: ["http://localhost:3000", "https://properties-alpha-neon.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Parse JSON
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => {
        console.error("Error Connecting to DB:", err.message);
        process.exit(1);
    });

// Routes
app.use("/Property", propertyRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));