'use strict';
require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const weather = require("./data/weather.json");
const cors = require("cors");
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const axios = require('axios')

app.use(cors());

class Forecast {
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

app.get("/weather", async (req, res) => {
  const q = req.query
  const lat = q.lat;
  const lon = q.lon;
  const searchQuery = q.searchquery;
  const dayData = [];

  let weatherApiUrl = `https://api.weatherbit.io/v2.0/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=I`;

  const liveWeatherData = await axios.get(weatherApiUrl);

  let current = liveWeatherData.data

  // let current = haveWeatherData(searchQuery);

  if (current) {

    for (let day of current.data){
      dayData.push(new Forecast(day.datetime, day.weather.description));
    }

    res.send(dayData)

  } else {
    res.send('Sorry, no weather data from ' + searchQuery)
  }

});


app.listen(PORT, (req, res) => console.log('Proof of life'));