const apiKey = '0a093f521e98a991f4e4cc2a12460255';

let regionsPromise;
const RegionApiCall = async () => {
    if (!regionsPromise) {
        const regionAPI = `http://localhost:3001/getRegion`;

        regionsPromise = fetch(regionAPI)
            .then(results => {
                return results.json();
            })
            .catch((err) => {
                console.error(err);
            })
    }
    return regionsPromise;
}


let providerListPromise;
const ProviderListApiCall = async () => {
    if (!providerListPromise) {
        const providerListAPI = `http://localhost:3001/getProviderList`;

        providerListPromise = fetch(providerListAPI)
            .then(results => {
                return results.json();
            }).catch((err) => {
                console.error("Failed to fetch provider options", err);
            })
    }
    return providerListPromise;
}

let genreListPromises = {};
const GenreListApiCall = (tvOrMovie) => {
    const key = `${tvOrMovie}`;

    if (!genreListPromises.hasOwnProperty(key)) {
        const genreListURL = `https://localhost:3001/getGenreList`;

        genreListPromises[key] = fetch(genreListURL)
            .then(results => {
                return results.json();
            }).catch((err) => {
                console.log("Failed to fetch genres", err);
            })
    }
    return genreListPromises[key];
}

let providerIconPromises = {};
const ProviderIconsApiCall = async (tvMovieToggle, movieID, currentRegion, setFetchStatus) => {
    const key = `${movieID}`;
    if (!providerIconPromises.hasOwnProperty(key)) {
        // there is no way to filter by region (https://www.themoviedb.org/talk/643dbcf75f4b7304e2fe7f2a)
        const getMovieViewingOptions = `https://api.themoviedb.org/3/${tvMovieToggle}/${movieID}/watch/providers?api_key=${apiKey}`;

        providerIconPromises[key] = fetch(getMovieViewingOptions)
            .then(results => {
                return results.json();
            })
            .then(data => {

                const emptyObject = {
                    buy_rent: [{ logo_path: 'N/A', provider_id: 'buy/rent_N/A', provider_name: 'N/A' }],
                    stream: [{ logo_path: 'N/A', provider_id: 'stream_N/A', provider_name: 'N/A' }]
                }
                // return data.results;
                return (data.results[currentRegion[0]] ? data.results[currentRegion[0]] : emptyObject);
            }).catch((err) => {
                setFetchStatus('Failed to load viewing options');
                console.log('Failed to fetch provider icons', err);
            })
    }
    return providerIconPromises[key];
}

let getMoviePromises = {};
const MoviesApiCall = async (currentPage, tvMovieToggle, isTrending, userSelections, setStatusMessage) => {

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
    return getMoviePromises[key];
}
// structuring the url from user selections to be passed into MovieApiCall
const UserSelectionURL = (currentPage, tvMovieToggle, sortOption, currentRegion, startDate, endDate, provider, genre) => {
    const baseURL = 'https://api.themoviedb.org/3';
    const url = new URL(baseURL + "/discover/" + tvMovieToggle);
    const regionCode = currentRegion[0];
    let cacheKey = [`${tvMovieToggle}`];

    const params = new URLSearchParams({
        "api_key": apiKey,
        "vote_count.gte": 10,
        "sort_by": sortOption,
        "watch_region": regionCode,
        "language": "en-US",
        "page": currentPage
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
    url.search = params;
    return [url, cacheKey.join('/')];
}

export { RegionApiCall, ProviderListApiCall, GenreListApiCall, ProviderIconsApiCall, MoviesApiCall, UserSelectionURL }