let languagePromise;
const LanguageApiCall = async () => {
    if (!languagePromise) {
        const languageAPI = `/.netlify/functions/get-language-list?`;

        languagePromise = fetch(languageAPI)
            .then(res => {
                return res.json();
            })
            .catch((err) => {
                console.error(err);
            })
    }
    return languagePromise;
}

let regionsPromise = {};
const RegionApiCall = async (currentLanguage) => {
    
    const key = currentLanguage[0];
    console.log(key);
    if (!regionsPromise.hasOwnProperty(key)) {
        const regionAPI = `/.netlify/functions/get-regions?language=${key}`;

        regionsPromise[key] = fetch(regionAPI)
            .then(res => {
                return res.json();
            })
            .catch((err) => {
                console.error(err);
            })
    }
    return regionsPromise[key];
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
    console.log(providerListPromise);
    return providerListPromise;
}

let genreListPromises = {};
const GenreListApiCall = (tvOrMovie, currentLanguage) => {
    const langCode = currentLanguage[0];
    const key = `${tvOrMovie}/${langCode}`;

    if (!genreListPromises.hasOwnProperty(key)) {
        const genreListURL = `.netlify/functions/get-genre-list?mediaType=${tvOrMovie}&language=${langCode}`;

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
const ProviderIconsApiCall = async (tvOrMovie, movieID, currentRegion) => {
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
                console.log('Failed to load provider icons', err);
            })
    }
    return providerIconPromises[key];
}

let getMoviePromises = {};
const MoviesApiCall = async (currentPage, tvOrMovie, isTrending, currentLanguage, userSelections, searchState) => {
    const langCode = currentLanguage[0];
    const selectionsQueryString = encodeURIComponent(userSelections[0]);
    const urlCacheKey = userSelections[1];
 
    let key = isTrending ? `Trending/${tvOrMovie}/${langCode}/${currentPage}` : `${urlCacheKey}`;

    if (!getMoviePromises.hasOwnProperty(key)) {
        const defaultURL = `.netlify/functions/get-gallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&page=${currentPage}&language=${langCode}`;
        const formURL = `.netlify/functions/get-gallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&page=${currentPage}&selectionsQueryString=${selectionsQueryString}&searchState=${searchState}`;
        const searchBarURL = `.netlify/functions/get-gallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&page=${currentPage}&language=${langCode}&searchValue=${selectionsQueryString}&searchState=${searchState}`;

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
            })
    }
    return getMoviePromises[key];
}

export { RegionApiCall, LanguageApiCall, ProviderListApiCall, GenreListApiCall, ProviderIconsApiCall, MoviesApiCall }