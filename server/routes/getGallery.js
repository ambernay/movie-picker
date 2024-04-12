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
    const userSelections = await res.locals.userSelections;
    // const regionCode = req.query.userSelections.watch_region;

    if (!getMoviePromises.hasOwnProperty(key)) {
        const baseURL = 'https://api.themoviedb.org/3';

        const defaultURL = `${baseURL}/trending/${tvOrMovie}/day?api_key=${apiKey}&language=${language}&page=${currentPage}`;

        const userURL = new URL(`${baseURL}/discover/${tvOrMovie}`)

        // const url = isTrending === 'true' ? defaultURL : userURL;
        let url = '';

        if (isTrending === 'false') {
            console.log("user selections from gallery", userSelections);

            // axios.get('/userParams')
            //     .then(response => console.log(response))

            const params = new URLSearchParams({
                "api_key": apiKey,
                "vote_count.gte": 10,
                "sort_by": "vote_average.desc",
                "watch_region": "CA",
                "language": "en-US",
                "page": 1,
                "with_genres": "10751",
                "with_watch_providers": "8",
                "primary_release_date.gte": "2010-01-01",
                "primary_release_date.lte": "2019-12-31"
            })

            // const params = new URLSearchParams({
            //     "api_key": apiKey,
            //     "vote_count.gte": userSelections.voteCount,
            //     "sort_by": userSelections.sortOption,
            //     "watch_region": userSelections.regionCode,
            //     "language": userSelections.language,
            //     "page": userSelections.currentPage
            // })

            // // add objects only when selected
            // if (userSelections.startDate && userSelections.endDate) {
            //     params.append("primary_release_date.gte", userSelections.startDate);
            //     params.append("primary_release_date.lte", userSelections.endDate);
            // }
            // if (userSelections.providerID && userSelections.providerID !== "all") {
            //     params.append("with_watch_providers", userSelections.providerID);
            // }
            // if (userSelections.genreID && userSelections.genreID !== "all") {
            //     params.append("with_genres", userSelections.genreID);
            // };

            userURL.search = params;
            url = userURL;

        } else { url = defaultURL }

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