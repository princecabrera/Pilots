const express = require('express');
const mongoose = require('mongoose');
const {Show} = require('../models/show')
const {Genre} = require('../models/genre')
const router = express.Router();
router.use(express.json())
const db = `pilots`;

mongoose.connect(`mongodb://localhost/${db}`, {useNewUrlParser:true, useUnifiedTopology:true})
.then(console.log(`SHOWS CONNECTED TO ${db}`))
.catch(err => console.log(`OOPS, COULDN'T CONNECT: ${err}`))

router.get(`/`, async (req, res) => {
    const shows = await Show
    .find()
    res.send(shows)
})

router.post(`/`, async (req, res) => {
    const genre = await Genre.findById(req.body.genreId);
    
    if(!genre) return res.status(400).send('Invalid Genre!')

    let show = new Show({
        name: req.body.name,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });
    
    show = await show.save()
    res.send(show)
})

// router.get()

// router.put()

// router.delete()

module.exports = router;