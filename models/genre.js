const mongoose = require('mongoose');

// DB Schema Creation
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

// Setting Up Model for Schema
const Genre = mongoose.model('Genre', genreSchema);

module.exports = {Genre, genreSchema}