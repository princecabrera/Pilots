const express = require('express');
const mongoose = require('mongoose');

const {Customer} = require('../models/customer')
const router = express.Router();
router.use(express.json())
const db = `pilots`;

mongoose.connect(`mongodb://localhost/${db}`, {useNewUrlParser:true, useUnifiedTopology:true})
.then(console.log(`CUSTOMERS CONNECTED TO ${db}`))
.catch(err => console.log(`Error, could not connect to Database ${db}, Error Detail: ${err}`))



router.get(`/`, async (req, res) => res.send(await Customer.find().select(['name', 'isGold', 'phone'])))

router.post(`/`, async (req, res) => {
    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
    })
    customer = await customer.save()

    res.send(customer)
})

router.get(`/:id`, async (req, res) => {
    res.send(await Customer
        .findById(req.params.id)
        .select(['name', 'isGold', 'phone']))
})

router.put(`/:id`, async (req, res) => {
    let customerInfo = {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
    }
    let updateCustomer = await Customer.findByIdAndUpdate(req.params.id, customerInfo, {new: true, useFindAndModify: false})
    if(!updateCustomer) return res.status(400).send(`OOPPSS! Customer with ID ${req.params.id} was not found!`)

    res.send(updateCustomer)
})

router.delete(`/:id`, async (req, res) => {
    let customerToDelete = await Customer.findByIdAndDelete(req.params.id);
    if(!customerToDelete) return console.log(`OOOPS! Customer with id ${req.params.id} was not found, check and try again!`)

    res.send(customerToDelete)
})

module.exports = router;