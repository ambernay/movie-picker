const apiKey = require('./apikey');
const axios = require('axios');

let genreListPromises = {};
const getGenreList = (req, res) => {
    // const key = `${tvOrMovie}`;
    const key = req.query.mediaType;
    console.log(key);
    if (!genreListPromises.hasOwnProperty(key)) {
        // const genreListAPI = `https://api.themoviedb.org/3/genre/${tvOrMovie}/list?api_key=${apiKey}&language=en-US`;
        const genreListAPI = `https://api.themoviedb.org/3/genre/${key}/list?api_key=${apiKey}&language=en-US`;

        genreListPromises[key] = axios.get(genreListAPI)
            .then(response => {
                // adds an All button
                const genres = response.data.genres;
                genres.push({ "id": "all-genres", "name": "All" });
                return genres;
            }).catch((err) => {
                console.log("Failed to fetch genres", err);
            })
    }
    genreListPromises[key].then((data) => {
        res.json(data)
    });
    // return genreListPromises[key];
}

module.exports = { getGenreList }