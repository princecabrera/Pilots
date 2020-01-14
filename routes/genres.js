const express = require('express');
const mongoose = require('mongoose');

const db = `pilots`;

const router = express.Router();
router.use(express.json())



mongoose.connect(`mongodb://localhost/${db}`, {useNewUrlParser:true, useUnifiedTopology:true})
.then(console.log(`CONNECTED TO ${db}`))
.catch(err => console.log(`An error occurred: ${err}`))

// ******** Persisted in MongoDB ********

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




router.get(`/`, async (req, res) => res.send( await Pilot.find().select({name:1, _id:1})));

router.post(`/`,  async (req, res) => {
    let genre = new Pilot({name: req.body.name})
    genre = await genre.save()

    res.send(genre)
     
})

router.get(`/:id`, async (req, res)=>{
    let genre = await Pilot.findById({_id: req.params.id}).select({name:1, _id:1})
    if(!genre) return res.status(400).send(`OOPPSS! Genre with ID ${req.params.id} was not found!`)

    res.send(genre);
})

router.put(`/:id`, async (req, res)=>{
    let genreToPut = await Pilot.findByIdAndUpdate(req.params.id,{name: req.body.name}, {new: true, useFindAndModify: false})

    if(!genreToPut) return res.status(400).send(`OOPPSS! Genre with ID ${req.params.id} was not found!`)

    res.send(genreToPut);
})
router.delete(`/:id`, async (req, res) => {
    let genreToDel = await Pilot.findByIdAndDelete({_id: req.params.id})
    if(!genreToDel) return res.status(400).send(`OOPPSS! Genre with ID ${req.params.id} was not found!`)

    res.send(genreToDel);
});

module.exports = router;