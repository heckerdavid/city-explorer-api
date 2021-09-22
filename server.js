'use strict';
require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const weather = require("./data/weather.json");

class Forcast {
  constructor(date, description) {
    this.date = date,
    this.description = description
  }
}




app.get('/', (req, res) => {
  res.send('hello world')
});

app.get("/melissa", (req, res) => {
  res.send("hello melissa");
});

// this should use find()
let haveWeatherData = (city) => {
  for (let data of weather) {
    if (data.city_name.toLowerCase() === city) {
      return data;
    }
  }
}

app.get("/weather", (req, res) => {
  const q = req.query
  const lat = q.lat;
  const lon = q.lon;
  const searchQuery = q.searchquery;

  let current = haveWeatherData(searchQuery);
  if (current) {
    res.send('city name is ' + current.city_name)
  } else {
    res.send('Sorry, no data')
  }

  res.send(lat + lon + searchQuery);
});


app.listen(PORT, (req, res) => console.log('Proof of life'));