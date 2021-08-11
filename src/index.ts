const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const Movie = require('./models/movie');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/movies', async (request, response) => {
  const movies = await Movie.find({}).limit(10);
  response.json(movies.map(movie => movie.toJSON()));
});

const PORTTOUSE = process.env.PORT || 3001;

app.listen(PORTTOUSE, () => {
  console.log(`Server running on port ${PORTTOUSE}`);
});
