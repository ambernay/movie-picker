const apiKey = require('./apikey');
const axios = require('axios');

let providerListPromise;
const getProviderList = (_req, res) => {
    if (!providerListPromise) {
        // codes are the same between movie and tv
        const providerListAPI = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}&language=en-US`;

        providerListPromise = axios.get(providerListAPI)
            .then(response => {
                // filter api request for specific providers
                // appletv:2, netflix:8, tubi:73, amazon:119, crave:230, disney:337,paramount:531
                const selectionOfProviders = response.data.results.filter((provider) => {
                    return [2, 8, 73, 119, 230, 337, 531].includes(provider.provider_id)
                });
                return selectionOfProviders;
            }).catch((err) => {
                console.error("Failed to fetch provider options", err);
            })
    }
    providerListPromise.then((data) => res.json(data));
}

module.exports = { getProviderList }
