const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const movieSchema = require('./models/movie');
const middleware = require('./utils/middleware');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/movies/:page', async (request, response) => {
  let filterQuery = {};
  const numMovies = 30;
  const numSkips = numMovies * (Number(request.params.page) - 1);
  Object.keys(request.query).forEach(key => {
    filterQuery[key] = { $in: request.query[key] };
  });
  console.log(filterQuery);
  const Movie = mongoose.model('Movie', movieSchema, `movies${request.query.year}`);
  const movies = await Movie.find(filterQuery)
    .skip(numSkips)
    .limit(numMovies);
  response.json(movies.map(movie => movie.toJSON()));
});

app.use(middleware.tokenExtractor);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

module.exports = app;
