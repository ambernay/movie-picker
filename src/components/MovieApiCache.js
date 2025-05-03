import { TransObj } from './TranslationObjects.js';

let regionsPromise = {};
const RegionApiCall = async (currentLanguage) => {
    
    const key = currentLanguage[0];
   
    if (!regionsPromise.hasOwnProperty(key)) {
        const regionAPI = `/.netlify/functions/get-regions?language=${key}`;

        regionsPromise[key] = fetch(regionAPI)
            .then(res => {
                if(res.status != 200) {
                    console.log("Regions API did not succeed");
                    return undefined;
                }
                return res.json();
            })
            .catch((err) => {
                console.error(err);
                return undefined;
            })
    }
    return regionsPromise[key];
}

let providerFormListPromises = {};
const ProviderFormListApiCall = async (currentLanguage, currentRegion, displayAmount) => {
    const langCode = currentLanguage[0].toLowerCase();
    const regionCode = currentRegion[0];
    const key = `${langCode}/${regionCode}` 

    if (!providerFormListPromises.hasOwnProperty(key)) {
        const providerListURL = `.netlify/functions/get-provider-list?language=${langCode}&regionCode=${regionCode}`;

        providerFormListPromises[key] = fetch(providerListURL)
            .then(res => {
                if(res.status != 200) {
                    console.log("Provider list API did not succeed");
                    return undefined;
                }
                return res.json();
            }).catch((err) => {
                console.error("Failed to fetch provider options", err);
                return undefined;
            })
    }
    return providerFormListPromises[key];
}

let genreListPromises = {};
const GenreListApiCall = (tvOrMovie, currentLanguage) => {
    const allButtonTrans = TransObj[`${currentLanguage[0]}`]['all'];
    const langCode = currentLanguage[0].toLowerCase();
    const key = `${tvOrMovie}/${langCode}`;

    if (!genreListPromises.hasOwnProperty(key)) {
        const genreListURL = `.netlify/functions/get-genre-list?mediaType=${tvOrMovie}&language=${langCode}&translation=${allButtonTrans}`;

        genreListPromises[key] = fetch(genreListURL)
            .then(res => {
                if(res.status != 200) {
                    console.log("Genre API did not succeed");
                    return undefined;
                }
                return res.json();
            }).catch((err) => {
                console.log("Failed to fetch genres", err);
                return undefined;
            })
    }
    return genreListPromises[key];
}

// providers for each individual movie
let providerPosterPromises = {};
const ProviderPosterApiCall = async (tvOrMovie, movieID, currentRegion) => {
    const regionCode = currentRegion[0];
    const key = `${movieID}/${regionCode}`;

    if (!providerPosterPromises.hasOwnProperty(key)) {
        // there is no way to filter by region (https://www.themoviedb.org/talk/643dbcf75f4b7304e2fe7f2a)
        const viewingOptionsURL = `.netlify/functions/get-viewing-options?mediaType=${tvOrMovie}&id=${movieID}&regionCode=${regionCode}`;

        providerPosterPromises[key] = fetch(viewingOptionsURL)
            .then(res => {
                // if(res.status != 200) {
                //     console.log("Movie provider list API did not succeed");
                //     return undefined;
                // }
                return res.json();
            })
            .catch((err) => {
                console.log('Failed to load provider icons', err);
                return undefined;
            })
    }
    return providerPosterPromises[key];
}

let getMoviePromises = {};
const MoviesApiCall = async (currentPage, tvOrMovie, currentLanguage, 
    userSelections, searchState) => {
    const langCode = currentLanguage[0];
    const selectionsQueryString = encodeURIComponent(userSelections[0]);
    const urlCacheKey = userSelections[1];

    let key = searchState === 'trending' ? `Trending/${tvOrMovie}/${langCode}/${currentPage}` : `${urlCacheKey}`;

    if (!getMoviePromises.hasOwnProperty(key)) {
        const defaultURL = `.netlify/functions/get-gallery?searchState=${searchState}&mediaType=${tvOrMovie}&page=${currentPage}&language=${langCode}`;
        const formURL = `.netlify/functions/get-gallery?searchState=${searchState}&mediaType=${tvOrMovie}&page=${currentPage}&selectionsQueryString=${selectionsQueryString}`;
        const searchBarURL = `.netlify/functions/get-gallery?searchState=${searchState}&mediaType=${tvOrMovie}&page=${currentPage}&language=${langCode}&searchValue=${selectionsQueryString}`;
        const personURL = `.netlify/functions/get-gallery?searchState=${searchState}&language=${langCode}&page=${currentPage}&searchValue=${userSelections[0]}`;

        let url;
        if (searchState === 'trending') {url = defaultURL}
        else if (searchState === 'formSearch'){url = formURL}
        else if(searchState === 'searchBar') {url = searchBarURL}
        else if (searchState === 'person') {url = personURL}
 
        getMoviePromises[key] = fetch(url)
            .then(res => {
                if(res.status != 200) {
                    console.log("Movie API did not succeed");
                    return undefined;
                }
                return res.json();
            })
            .catch((err) => {
                console.log('Failed to fetch Trending', err);
                return undefined;
            })
    }
    return getMoviePromises[key];
}

let movieInfoPromise = {};
const MovieInfoApiCall = (movieID, tvOrMovie) => {
    
    const key = movieID;
   
    if (!movieInfoPromise.hasOwnProperty(key)) {
        const movieInfoAPI = `/.netlify/functions/get-movie-info?movieID=${movieID}&mediaType=${tvOrMovie}`;

        movieInfoPromise[key] = fetch(movieInfoAPI)
            .then(res => {
                if(res.status != 200) {
                    console.log("Movie Info API did not succeed");
                    return undefined;
                }
                return res.json();
            })
            .catch((err) => {
                console.error(err);
                return undefined;
            })
    }
    return movieInfoPromise[key];
}

const GeoLocation = async () => {

    const geoLocation = `/.netlify/functions/get-geo-location`;

    const geoLocationPromise = fetch(geoLocation)
        .then(res => {
            if(res.status != 200) {
                console.log("Geo location API did not succeed");
                return undefined;
            }
            return res.json();
        })
        .catch((err) => {
            console.error(err);
            return undefined;
        })

    return geoLocationPromise;
}


export { RegionApiCall, ProviderFormListApiCall, GenreListApiCall, 
    ProviderPosterApiCall, MoviesApiCall, MovieInfoApiCall, GeoLocation }