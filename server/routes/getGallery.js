const apiKey = require('./apikey');
const axios = require('axios');

let getMoviePromises = {};
const getGallery = (currentPage, tvMovieToggle, isTrending, userSelections, setStatusMessage) => {

    const userURL = userSelections[0];
    const urlCacheKey = userSelections[1];
    let key = isTrending ? `Trending/${tvMovieToggle}/${currentPage}` : `${urlCacheKey}`;

    if (!getMoviePromises.hasOwnProperty(key)) {
        const defaultURL = new URL('https://api.themoviedb.org/3/trending/' + tvMovieToggle + '/day');

        // use default url on load or if trending selected else use userSelections passed in from Form
        const url = isTrending ? defaultURL : userURL;

        // default trending url for landing page
        const params = new URLSearchParams({
            "api_key": apiKey,
            "language": "en-US",
            "page": currentPage
        });

        defaultURL.search = params;

        getMoviePromises[key] = fetch(url)
            .then(results => {
                return results.json();
            })
            .then(data => {
                let apiResults = { movieResults: data.results, totalPages: data.total_pages }
                return apiResults
            }).catch((err) => {
                console.log('Failed to fetch Trending', err);
                let trendingType = tvMovieToggle === 'movie' ? 'movies' : 'tv shows';
                setStatusMessage(`Failed to Load Trending ${trendingType}`);

            })
    }
    getMoviePromises[key].then((data) => {
        res.json(data)
    });
}

module.exports = { getGallery }