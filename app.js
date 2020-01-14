// Globals from external imports
const express = require('express');

const app = express();

const genres = require(`./routes/genres`);
const port = process.env.PORT || 3001;


app.use(`/api/genres/`, genres);
app.get(`/`, (req, res) => {res.send(`OOPS! SOMETHING'S DEFINITELY WRONG!`)});
app.listen(port, () => console.log(`Listening on port ${port}`));
