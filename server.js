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
  const dayData = [];

  let current = haveWeatherData(searchQuery);

  if (current) {

    for (let day of current.data){
      dayData.push(new Forcast(day.datetime, day.weather.description));
    }

    res.send(dayData)

  } else {
    res.send('Sorry, no data')
  }

});


app.listen(PORT, (req, res) => console.log('Proof of life'));