import { TransObj } from './TranslationObjects.js';

let regionsPromise = {};
const RegionApiCall = async (currentLanguage) => {
    
    const key = currentLanguage[0];
   
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
    return providerListPromise;
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
const MoviesApiCall = async (currentPage, tvOrMovie, isTrending, currentLanguage, 
    userSelections, searchState, searchType) => {
    const langCode = currentLanguage[0];
    const selectionsQueryString = encodeURIComponent(userSelections[0]);
    const urlCacheKey = userSelections[1];
        console.log(searchState, userSelections);
    let key;
    if (isTrending) {key = `Trending/${tvOrMovie}/${langCode}/${currentPage}`}
    else if (!isTrending && searchState === 'formSearch'){key = `${urlCacheKey}`}
    else if (!isTrending && searchType === 'person'){key = `${userSelections[1]}/${currentPage}`}
    console.log(key, `${userSelections[1]}/${currentPage}`);

    if (!getMoviePromises.hasOwnProperty(key)) {
        const defaultURL = `.netlify/functions/get-gallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&page=${currentPage}&language=${langCode}`;
        const formURL = `.netlify/functions/get-gallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&page=${currentPage}&selectionsQueryString=${selectionsQueryString}&searchState=${searchState}`;
        const searchBarURL = `.netlify/functions/get-gallery?isTrending=${isTrending}&mediaType=${tvOrMovie}&page=${currentPage}&language=${langCode}&searchValue=${selectionsQueryString}&searchState=${searchState}`;
        const searchPeopleURL = `.netlify/functions/get-gallery?isTrending=${isTrending}&queryType=${searchType}&page=${currentPage}&language=${langCode}&searchState=${searchState}&searchValue=${selectionsQueryString}`;

        let url;
            if (isTrending) {url = defaultURL}
            else if (searchState === 'formSearch'){url = formURL}
            else if (searchState === 'searchBar' && searchType !== 'person') {url = searchBarURL}
            else if (searchState === 'searchBar' && searchType === 'person') {url = searchPeopleURL}
 
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

let getPeoplePromises = {};
const SearchPersonApiCall = async (searchType, userSelections, currentPage, currentLanguage) => {
    const selectionsQueryString = encodeURIComponent(userSelections[0]);
    const langCode = currentLanguage[0];

    let personKey = `${userSelections[0]}/searchType`;

    if (!getPeoplePromises.hasOwnProperty(personKey)) {
        const searchBarURL = `.netlify/functions/get-search-results?queryType=${searchType}&page=${currentPage}&language=${langCode}&searchValue=${selectionsQueryString}`;

        getPeoplePromises[personKey] = fetch(searchBarURL)
            .then(res => {
                return res.json();
            })
            .catch((err) => {
                console.log('Failed to fetch Trending', err);
            })
    }
    return getPeoplePromises[personKey];
}

let getPersonCreditsByIDPromises = {};
const SearchPersonByID= async (searchType, userSelections, currentPage, currentLanguage) => {
    const selectionsQueryString = encodeURIComponent(userSelections[0]);
    const langCode = currentLanguage[0];

    let personID = `${userSelections[0]}/searchType`;

    if (!getPersonCreditsByIDPromises.hasOwnProperty(personID)) {
        const searchBarURL = `.netlify/functions/get-search-results?queryType=${searchType}&page=${currentPage}&language=${langCode}&searchValue=${selectionsQueryString}`;

        getPersonCreditsByIDPromises[personID] = fetch(searchBarURL)
            .then(res => {
                return res.json();
            })
            .catch((err) => {
                console.log('Failed to fetch Trending', err);
            })
    }
    return getPersonCreditsByIDPromises[personID];
}

export { RegionApiCall, ProviderListApiCall, GenreListApiCall, ProviderIconsApiCall, MoviesApiCall, SearchPersonApiCall, SearchPersonByID }