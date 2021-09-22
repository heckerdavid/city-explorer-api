'use strict';

const express = require('express');

const app = express();

const weather = require("./data/weather.json");

app.get('/', (req, res) => {
  res.send('hello world')
}
)

app.get("/melissa", (req, res) => {
  res.send("hello melissa");
});



app.listen(3001, (req, res) => console.log('Proof of life'));