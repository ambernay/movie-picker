let regionsPromise;
const RegionApiCall = async () => {
    if (!regionsPromise) {
        const regionAPI = `/.netlify/functions/getRegion`;

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
        const providerListURL = `.netlify/functions/getProviderList`;

        providerListPromise = fetch(providerListURL)
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
        const genreListURL = `.netlify/functions/getGenreList?mediaType=${tvOrMovie}`;

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
const ProviderIconsApiCall = async (tvOrMovie, movieID, currentRegion, setFetchStatus) => {
    const regionCode = currentRegion[0];
    const key = `${movieID}`;

    if (!providerIconPromises.hasOwnProperty(key)) {
        // there is no way to filter by region (https://www.themoviedb.org/talk/643dbcf75f4b7304e2fe7f2a)
        const viewingOptionsURL = `.netlify/functions/getViewingOptions?mediaType=${tvOrMovie}&id=${movieID}&regionCode=${regionCode}`;

        providerIconPromises[key] = fetch(viewingOptionsURL)
            .then(results => {
                return results.json();
            })
            .catch((err) => {
                setFetchStatus('Failed to load viewing options');
                console.log('Failed to load provider icons', err);
            })
    }
    return providerIconPromises[key];
}

let getMoviePromises = {};
const MoviesApiCall = async (currentPage, tvOrMovie, isTrending, userSelections, setStatusMessage) => {

    const selectionsQueryString = userSelections[0];
    const urlCacheKey = userSelections[1];
    let key = isTrending ? `Trending/${tvOrMovie}/${currentPage}` : `${urlCacheKey}`;

    if (!getMoviePromises.hasOwnProperty(key)) {
        const defaultURL = `.netlify/functions/getGallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&page=${currentPage}&language=en-US&key=${key}`;
        const userURL = `.netlify/functions/getGallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&key=${key}&selectionsQueryString=${encodeURIComponent(selectionsQueryString)}`;

        // use default url on load or if trending selected else use userSelections passed in from Form
        const url = isTrending ? defaultURL : userURL;

        getMoviePromises[key] = fetch(url)
            .then(results => {
                return results.json();
            })
            .catch((err) => {
                console.log('Failed to fetch Trending', err);
                let trendingType = tvOrMovie === 'movie' ? 'movies' : 'tv shows';
                setStatusMessage(`Failed to Load Trending ${trendingType}`)
            })
    }
    return getMoviePromises[key];
}

// structuring the url from user selections to be passed into MovieApiCall
let storeUserSelections = {};
const UserSelectionURL = (currentPage, tvOrMovie, sortOption, currentRegion, startDate, endDate, provider, genre) => {

    const regionCode = currentRegion[0];
    let cacheKey = [`${tvOrMovie}`];

    // base params
    storeUserSelections = {
        "vote_count.gte": 10,
        "sort_by": sortOption,
        "watch_region": regionCode,
        "language": "en-US",
    }
    // add params to userSelections object only when selected
    if (startDate && endDate) {
        storeUserSelections["primary_release_date.gte"] = startDate;
        storeUserSelections["primary_release_date.lte"] = endDate;
        cacheKey.push((`${startDate}`).split('-')[0]);
    }
    if (provider && provider.id !== "all") {
        storeUserSelections["with_watch_providers"] = provider.id;
        // discard everything after first word
        cacheKey.push((`${provider.value}`).split(' ')[0]);
    }
    if (genre && genre.id !== "all") {
        storeUserSelections["with_genres"] = genre.id;
        // replace spaces with underscores
        cacheKey.push((`${genre.value}`).split(' ').join('_'));
    };

    const selectionsQueryString = turnSelectionsObjectToQueryString(storeUserSelections);

    // split on underscores and discard value before first underscore
    let sortOptionTitle = (`${sortOption}`).split('_')[1];
    cacheKey.push(`${sortOptionTitle}`, `${regionCode}`, `${currentPage}`);

    return [selectionsQueryString, cacheKey.join('/')];
}

function turnSelectionsObjectToQueryString(storeUserSelections) {
    const keys = Object.keys(storeUserSelections);
    const keyValuePairs = keys.map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(storeUserSelections[key]);
    });
    return (keyValuePairs.join('&'));
}

export { RegionApiCall, ProviderListApiCall, GenreListApiCall, ProviderIconsApiCall, MoviesApiCall, UserSelectionURL }