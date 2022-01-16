export {};
const mongoose = require('mongoose');
const configuration = require('../utils/config');

mongoose
  .connect(configuration.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((result: any) => {
    console.log('connected to MongoDB');
  })
  .catch((error: any) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3
  },
  year: {
    type: String,
    required: true,
    minLength: 4
  },
  runTime: {
    type: String,
    minLength: 3
  },
  director: {
    type: String,
    minLength: 3
  },
  plot: {
    type: String
  },
  poster: {
    type: String
  },
  genre: {
    type: [String]
  },
  cast: {
    type: [String]
  },
  streamingPlatforms: {
    type: [String]
  },
  ratings: {
    type: [Object]
  },
  language: {
    type: [String]
  },
  country: {
    type: [String]
  },
  metascore: {
    type: String
  },
  imdbRating: {
    type: String
  }
});

movieSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
  }
});

// module.exports = mongoose.model('Movie', movieSchema, 'movies2010');
module.exports = movieSchema;
