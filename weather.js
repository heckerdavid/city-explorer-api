"use strict";
require("dotenv").config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const axios = require("axios");

// this should use find()
let haveWeatherData = (city) => {
  for (let data of weather) {
    if (data.city_name.toLowerCase() === city) {
      return data;
    }
  }
}


class Forecast {
  constructor(date, description) {
    this.date = date, 
    this.description = description;
  }
}

let getWeather = async (req, res) => {
  const q = req.query;
  const lat = q.lat;
  const lon = q.lon;
  const searchQuery = q.searchquery;
  const dayData = [];

  let weatherApiUrl = `https://api.weatherbit.io/v2.0/current?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=I`;

  const liveWeatherData = await axios.get(weatherApiUrl);

  let current = liveWeatherData.data;

  // let current = haveWeatherData(searchQuery);

  if (current.data) {
    for (let day of current.data) {
      dayData.push(new Forecast(day.datetime, day.weather.description));
    }

    res.status(200).send(dayData);
  } else {
    res.status(500).send("Sorry, no weather data from " + searchQuery);
  }
};

module.exports = { getWeather };