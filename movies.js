"use strict";
require("dotenv").config();
const axios = require("axios");
const cache = require("./cache.js");

class Movie {
  constructor(title, overview, img_url, popularity, released) {
    (this.title = title),
      (this.overview = overview),
      (this.img_url = img_url),
      (this.popularity = popularity),
      (this.released = released);
  }
}

let getMovies = async (req, res) => {
  const q = req.query;
  const searchQuery = q.searchQuery;
  const key = "movies-" + searchQuery;
  const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
  const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

  // if  search is in cache, use it
  // if not, get new data and add it to cache
  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log("Cache hit");
    res.status(200).send(cache[key].data);
  } else {
    console.log("Cache miss");

    cache[key] = {};
    cache[key].timestamp = Date.now();
    let movieAPIResponse = await axios.get(movieURL)
    let sendThis = parseMovies(movieAPIResponse.data);
    cache[key].data = sendThis;
    res.status(200).send(sendThis);
  }
  return cache[key].data;
  // const movieResponse = await axios.get(movieURL);

  // let movieData = movieResponse.data;

  // if (movieData.results[1]) {
  //   const moviesArray = [];

  //   for (let movie of movieData.results) {
  //     moviesArray.push(
  //       new Movie(
  //         movie.original_title,
  //         movie.overview,
  //         movie.backdrop_path,
  //         movie.popularity,
  //         movie.release_date
  //       )
  //     );
  //   }
  //   res.status(200).send(moviesArray);
  // } else {
  //   res.status(500).send("Sorry, no movie data from " + searchQuery);
  // }
};

function parseMovies(movieData) {
  const moviesArray = [];

  for (let movie of movieData.results) {
    moviesArray.push(
      new Movie(
        movie.original_title,
        movie.overview,
        movie.backdrop_path,
        movie.popularity,
        movie.release_date
      )
    );
  }
  return moviesArray;
}

module.exports = { getMovies };
