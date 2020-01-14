const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String
})

const Customer = mongoose.model('customer', customerSchema);

exports.Customer = Customer;