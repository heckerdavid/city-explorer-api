'use strict';
require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const weatherFunctions = require('./weather.js');
const movieFunctions = require('./movies');

app.use(cors());

let handleError = (req, res) => res.status(500).send("Sorry, Something went wrong.");


app.get('/', (req, res) => {
  res.status(200).send('hello world')
});


app.get('/movies', movieFunctions.getMovies)

app.get("/weather", weatherFunctions.getWeather);

app.get('*', handleError)

app.listen(PORT, (req, res) => console.log('Proof of life. Port: ' + PORT));
