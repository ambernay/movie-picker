const apiKey = require('./apikey');
const axios = require('axios');
// const userSelections = require(userSelections);

let getMoviePromises = {};
const getGallery = async (req, res) => {

    const key = req.query.key;
    const tvOrMovie = req.query.mediaType;
    const currentPage = req.query.page;
    const language = req.query.language;
    const isTrending = req.query.isTrending;
    // const userSelections = await res.locals.userSelections;
    console.log('decoded', decodeURIComponent(req.query.selectionsQueryString));
    const userSelections = decodeURIComponent(req.query.selectionsQueryString);
    // const regionCode = req.query.userSelections.watch_region;

    if (!getMoviePromises.hasOwnProperty(key)) {
        const baseURL = 'https://api.themoviedb.org/3';

        const defaultURL = `${baseURL}/trending/${tvOrMovie}/day?api_key=${apiKey}&language=${language}&page=${currentPage}`;

        const userURL = `${baseURL}/discover/${tvOrMovie}?api_key=${apiKey}&${userSelections}`

        const url = isTrending === 'true' ? defaultURL : userURL;
        console.log('server url', url);

        getMoviePromises[key] = axios.get(url)
            .then(response => {
                // console.log(isTrending, url);
                // console.log("This is the response", response);
                let apiResults = { movieResults: response.data.results, totalPages: response.data.total_pages }
                // console.log("This is the apiResults", apiResults);
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