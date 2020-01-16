const express = require('express');
const mongoose = require('mongoose');

const {Genre} = require('../models/genre')
const router = express.Router();
router.use(express.json())
const db = `pilots`;

mongoose.connect(`mongodb://localhost/${db}`, {useNewUrlParser:true, useUnifiedTopology:true})
.then(console.log(`GENRES CONNECTED TO ${db}`))
.catch(err => console.log(`An error occurred: ${err}`))

// ******** Persisted in MongoDB ********

router.get(`/`, async (req, res) => res.send( await Genre.find().select({name:1, _id:1})));

router.post(`/`,  async (req, res) => {
    let genre = new Genre({name: req.body.name}) //Get info and store in object variable

    genre = await genre.save() //Save object variable to database
    
    // Return to user in GUI
    res.send(genre)     
})

router.get(`/:id`, async (req, res)=>{
    let genre = await Genre.findById({_id: req.params.id}).select({name:1, _id:1})
    if(!genre) return res.status(400).send(`OOPPSS! Genre with ID ${req.params.id} was not found!`)

    res.send(genre);
})

router.put(`/:id`, async (req, res)=>{
    let genreToPut = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name}, {new: true, useFindAndModify: false})

    if(!genreToPut) return res.status(400).send(`OOPPSS! Genre with ID ${req.params.id} was not found!`)

    res.send(genreToPut);
})
router.delete(`/:id`, async (req, res) => {
    let genreToDel = await Genre.findByIdAndDelete({_id: req.params.id})
    if(!genreToDel) return res.status(400).send(`OOPPSS! Genre with ID ${req.params.id} was not found!`)

    res.send(genreToDel);
});

module.exports = router;