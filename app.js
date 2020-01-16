// Globals from external imports
const express = require('express');

const app = express();

const genres = require(`./routes/genres`);
const customers = require(`./routes/customers`);
const shows = require(`./routes/shows`);
// console.log('here')
const port = process.env.PORT || 3001;


app.use(`/api/genres/`, genres);
app.use(`/api/customers/`, customers);
app.use(`/api/shows/`, shows);
app.get(`/`, (req, res) => {res.send(`OOPS! SOMETHING'S DEFINITELY WRONG!`)});
app.listen(port, () => console.log(`Listening on port ${port}`));
