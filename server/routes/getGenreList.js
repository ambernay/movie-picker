const apiKey = require('./apikey');
const axios = require('axios');

let genreListPromises = {};
const getGenreList = (_req, res) => {
    // const key = `${tvOrMovie}`;
    const key = 'movie';
    console.log(key);
    if (!genreListPromises.hasOwnProperty(key)) {
        // const genreListAPI = `https://api.themoviedb.org/3/genre/${tvOrMovie}/list?api_key=${apiKey}&language=en-US`;
        const genreListAPI = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

        genreListPromises[key] = axios.get(genreListAPI)
            .then(data => {
                // adds an All button
                data.genres.push({ "id": "all-genres", "name": "All" });
                return data.genres;
            }).catch((err) => {
                console.log("Failed to fetch genres", err);
            })
    }
    genreListPromises[key].then((data) => res.json(data));
    // return genreListPromises[key];
}

module.exports = { getGenreList }