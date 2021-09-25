"use strict";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const cache = require("./cache.js");
const axios = require("axios");


module.exports = getWeather;

function getWeather(latitude, longitude) {
  const key = "weather-" + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log("Cache hit");
  } else {
    console.log("Cache miss");
    console.log(url);
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url).then((response) => {console.log('response is ' + response)
    return parseWeather(response.data);
  })
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map((day) => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.datetime;
  }
}