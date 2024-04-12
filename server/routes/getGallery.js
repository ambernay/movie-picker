const apiKey = require('./apikey');
const axios = require('axios');

let getMoviePromises = {};
const getGallery = async (req, res) => {

    const key = req.query.key;
    const tvOrMovie = req.query.mediaType;
    const currentPage = req.query.page;
    const language = req.query.language;
    const isTrending = req.query.isTrending;
    const userSelections = decodeURIComponent(req.query.selectionsQueryString);

    if (!getMoviePromises.hasOwnProperty(key)) {
        const baseURL = 'https://api.themoviedb.org/3';

        const defaultURL = `${baseURL}/trending/${tvOrMovie}/day?api_key=${apiKey}&language=${language}&page=${currentPage}`;

        const userURL = `${baseURL}/discover/${tvOrMovie}?api_key=${apiKey}&${userSelections}`

        const url = isTrending === 'true' ? defaultURL : userURL;
        console.log('server url', url);

        getMoviePromises[key] = axios.get(url)
            .then(response => {
                let apiResults = { movieResults: response.data.results, totalPages: response.data.total_pages }
                return apiResults;
            }).catch((err) => {
                console.log('Failed to fetch Trending', err);
            })
    }
    getMoviePromises[key].then((data) => {
        res.json(data)
    });
}

module.exports = { getGallery }