const mongoose = require('mongoose');

// DB Schema Creation
const pilotsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

// Setting Up Model for Schema
const Pilot = mongoose.model('Pilot', pilotsSchema);

exports.Pilot = Pilot;