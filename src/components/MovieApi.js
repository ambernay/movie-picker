const apiKey = '0a093f521e98a991f4e4cc2a12460255';

let regionsPromise;
const RegionApiCall = async () => {
    if (!regionsPromise) {
        // sorts by english_name (instead of country code)
        const sortRegionsByName = (a, z) => a.english_name.localeCompare(z.english_name);

        const regionAPI = `https://api.themoviedb.org/3/watch/providers/regions?api_key=${apiKey}&language=en-US`;

        regionsPromise = fetch(regionAPI)
            .then(results => {
                return results.json();
            })
            .then(data => {
                // sorts by english_name (instead of country code)
                return data.results.sort(sortRegionsByName);
            }).catch((err) => {
                console.error(err);
            })
    }
    return regionsPromise;
}


let providerButtonsPromise;
const ProviderButtonsApiCall = async () => {
    if (!providerButtonsPromise) {
        // codes are the same between movie and tv
        const providersList = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}&language=en-US`;

        providerButtonsPromise = fetch(providersList)
            .then(results => {
                return results.json();
            })
            .then(data => {
                console.log(data);
                // filter api request for specific providers
                // appletv:2, netflix:8, tubi:73, amazon:119, crave:230, disney:337,paramount:531
                const selectionOfProviders = data.results.filter((provider) => {
                    return [2, 8, 73, 119, 230, 337, 531].includes(provider.provider_id)
                });
                return selectionOfProviders;
            }).catch((err) => {
                console.error(err);
                alert("Failed to fetch provider options");
            })
    }
    return providerButtonsPromise;
}

// const getTrendingPromises = {};
// const getTrending = (currentPage, tvMovie) => {
//     const key = `${currentPage}_${movie}_${region}`;

//     if (!getTrendingPromises.keys.includes(key)) {
//         const defaultURL = new URL('https://api.themoviedb.org/3/trending/' + tvMovieToggle + '/day');

//         // use default url on load or if trending selected else use newURL passed in from Form
//         const url = isTrending ? defaultURL : newURL;

//         // default trending url for landing page
//         const params = new URLSearchParams({
//             "api_key": apiKey,
//             "language": `en-US`,
//             "page": currentPage
//         });

//         defaultURL.search = params;

//         getTrendingPromises[key] = fetch(`moviedb.com/trending/${pageNumber}`);
//     }

//     return getTrendingPromises[key];
// }

export { RegionApiCall, ProviderButtonsApiCall }