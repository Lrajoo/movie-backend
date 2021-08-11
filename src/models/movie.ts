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
  }
});

movieSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    // delete returnedObject._id
    // delete returnedObject.__v
  }
});

module.exports = mongoose.model('Movie', movieSchema);
