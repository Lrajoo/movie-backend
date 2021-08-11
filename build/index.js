"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.get('/api/movies', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield Movie.find({}).limit(10);
    response.json(movies.map(movie => movie.toJSON()));
}));
const PORTTOUSE = process.env.PORT || 3001;
app.listen(PORTTOUSE, () => {
    console.log(`Server running on port ${PORTTOUSE}`);
});
