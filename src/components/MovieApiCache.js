let regionsPromise;
const RegionApiCall = async () => {
    if (!regionsPromise) {
        const regionAPI = `/.netlify/functions/get-regions?`;

        regionsPromise = fetch(regionAPI)
            .then(res => {
                return res.json();
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
        const providerListURL = `.netlify/functions/get-provider-list`;

        providerListPromise = fetch(providerListURL)
            .then(res => {
                return res.json();
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
        const genreListURL = `.netlify/functions/get-genre-list?mediaType=${tvOrMovie}`;

        genreListPromises[key] = fetch(genreListURL)
            .then(res => {
                return res.json();
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
        const viewingOptionsURL = `.netlify/functions/get-viewing-options?mediaType=${tvOrMovie}&id=${movieID}&regionCode=${regionCode}`;

        providerIconPromises[key] = fetch(viewingOptionsURL)
            .then(res => {
                return res.json();
            })
            .catch((err) => {
                setFetchStatus('Failed to load viewing options');
                console.log('Failed to load provider icons', err);
            })
    }
    return providerIconPromises[key];
}

let getMoviePromises = {};
const MoviesApiCall = async (currentPage, tvOrMovie, isTrending, userSelections, searchState, setStatusMessage) => {

    const selectionsQueryString = userSelections[0];
    const urlCacheKey = userSelections[1];
    console.log(userSelections);
    let key = isTrending ? `Trending/${tvOrMovie}/${currentPage}` : `${urlCacheKey}`;

    if (!getMoviePromises.hasOwnProperty(key)) {
        const defaultURL = `.netlify/functions/get-gallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&page=${currentPage}&language=en-US`;
        const formURL = `.netlify/functions/get-gallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&selectionsQueryString=${encodeURIComponent(selectionsQueryString)}&searchState=${searchState}`;
        const searchBarURL = `.netlify/functions/get-gallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&searchValue=${selectionsQueryString}&searchState=${searchState}`;

        let url;
        if (isTrending) {url = defaultURL}
        else if (searchState === 'formSearch'){url = formURL}
        else if(searchState === 'searchBar') {url = searchBarURL}

        getMoviePromises[key] = fetch(url)
            .then(res => {
                return res.json();
            })
            .catch((err) => {
                console.log('Failed to fetch Trending', err);
                let trendingType = tvOrMovie === 'movie' ? 'movies' : 'tv shows';
                setStatusMessage(`Failed to Load Trending ${trendingType}`)
            })
    }
    return getMoviePromises[key];
}

export { RegionApiCall, ProviderListApiCall, GenreListApiCall, ProviderIconsApiCall, MoviesApiCall }