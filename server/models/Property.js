const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true

    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_uri: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
});

const User = mongoose.model("Property", propertySchema);

module.exports = User; 
