const mongoose = require('mongoose');
const {genreSchema} = require('./genre')
const Show = mongoose.model('Show', new mongoose.Schema({
    name: String,
    numberInStock: {type: Number, default: 0},
    dailyRentalRate: {type: Number, default: 0},
    genre: genreSchema
}))

module.exports = {Show}