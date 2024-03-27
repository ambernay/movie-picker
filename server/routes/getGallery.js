const apiKey = require('./apikey');
const axios = require('axios');

let getMoviePromises = {};
const getGallery = (req, res) => {

    const key = req.query.key;
    const tvOrMovie = req.query.mediaType;
    const currentPage = req.query.page;
    const language = req.query.language;
    const isTrending = req.query.isTrending;
    // const regionCode = req.query.userSelections.watch_region;

    if (!getMoviePromises.hasOwnProperty(key)) {
        const defaultURL = `https://api.themoviedb.org/3/trending/${tvOrMovie}/day?api_key=${apiKey}&language=${language}&page=${currentPage}`;

        const baseURL = 'https://api.themoviedb.org/3';
        const url = new URL(baseURL + "/discover/" + tvOrMovie);

        // use default url on load or if trending selected else use userSelections passed in from Form
        // const url = isTrending ? defaultURL : userURL;
        // const url = defaultURL;

        // default trending url for landing page
        // const params = new URLSearchParams({
        //     "api_key": apiKey,
        //     "language": language,
        //     "page": currentPage
        // });

        // defaultURL.search = params;
        // url.search = params;

        // const params = new URLSearchParams{
        //     "api_key": apiKey,
        //     "vote_count.gte": 10,
        //     "sort_by": sortOption,
        //     "watch_region": req.query.userSelections.regionCode,
        //     "language": "en-US",
        //     "page": currentPage
        // }

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