let getMoviePromises = {};
const MoviesApiCall = async (currentPage, tvOrMovie, isTrending, userSelections, setStatusMessage) => {

    const userURL = userSelections[0];
    const urlCacheKey = userSelections[1];
    let key = isTrending ? `Trending/${tvOrMovie}/${currentPage}` : `${urlCacheKey}`;

    if (!getMoviePromises.hasOwnProperty(key)) {
        const defaultURL = `http://localhost:3001/getGallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&page=${currentPage}&language=en-US&key=${key}`;

        // use default url on load or if trending selected else use userSelections passed in from Form
        const url = isTrending ? defaultURL : userURL;

        // default trending url for landing page
        // const params = new URLSearchParams({
        //     "api_key": apiKey,
        //     "language": "en-US",
        //     "page": currentPage
        // });

        // defaultURL.search = params;

        getMoviePromises[key] = fetch(url)
            .then(results => {
                return results.json();
            })
            .catch((err) => {
                console.log('Failed to fetch Trending', err);
                let trendingType = tvOrMovie === 'movie' ? 'movies' : 'tv shows';
                setStatusMessage(`Failed to Load Trending ${trendingType}`);

            })
    }
    return getMoviePromises[key];
}

// structuring the url from user selections to be passed into MovieApiCall

const UserSelectionURL = (isTrending, currentPage, tvOrMovie, sortOption, currentRegion, startDate, endDate, provider, genre) => {
    // const baseURL = 'https://api.themoviedb.org/3';
    // const url = new URL(baseURL + "/discover/" + tvOrMovie);
    const userURL = new URL(`http://localhost:3001/getGallery`);
    const regionCode = currentRegion[0];
    let cacheKey = [`${tvOrMovie}`];

    const params = new URLSearchParams({
        "api_key": apiKey,
        "isTrending": isTrending,
        "mediaType": tvOrMovie,
        "vote_count.gte": 10,
        "sort_by": sortOption,
        "watch_region": regionCode,
        "language": "en-US",
        "page": currentPage,
        "key": cacheKey
    })
    // add params only when selected
    if (startDate && endDate) {
        params.append("primary_release_date.gte", startDate);
        params.append("primary_release_date.lte", endDate);
        cacheKey.push((`${startDate}`).split('-')[0]);
    }
    if (provider && provider.id !== "all") {
        params.append("with_watch_providers", provider.id);
        // discard everything after first word
        cacheKey.push((`${provider.value}`).split(' ')[0]);
    }
    if (genre && genre.id !== "all") {
        params.append("with_genres", genre.id);
        // replace spaces with underscores
        cacheKey.push((`${genre.value}`).split(' ').join('_'));
    };
    // split on underscores and discard value before first underscore
    let sortOptionTitle = (`${sortOption}`).split('_')[1];
    cacheKey.push(`${sortOptionTitle}/${regionCode}/${currentPage}`);
    // userURL.search = params;
    console.log(userURL);
    return [userURL, cacheKey.join('/')];
}

export { MoviesApiCall, UserSelectionURL }