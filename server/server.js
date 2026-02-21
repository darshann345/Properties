// server.js

const express = require("express");
const cors = require("cors");         // for enabling CORS
const mongoose = require("mongoose");
const propertyRouter = require("./Router/Property");


const app = express();
const PORT = 5000;

// Enable CORS for all origins (so React can access APIs)
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// MongoDB connection
const DB_URL =
    "mongodb+srv://darshann679596_db_user:Racer123@cluster0.f7difmy.mongodb.net/?appName=Cluster0";

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
app.use(express.json());


app.use("/Property", propertyRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
