const apiKey = require('./apikey');
const axios = require('axios');

let regionsPromise;
const getRegion = (_req, res) => {
    if (!regionsPromise) {
        // sorts by english_name (instead of country code)
        const sortRegionsByName = (a, z) => a.english_name.localeCompare(z.english_name);

        const regionAPI = `https://api.themoviedb.org/3/watch/providers/regions?api_key=${apiKey}&language=en-US`;

        regionsPromise = axios.get(regionAPI)
            .then((response) => {
                // sorts by english_name (instead of country code)
                return response.data.results.sort(sortRegionsByName);
            }).catch((err) => {
                console.error(err);
            })
    }

    regionsPromise.then((data) => res.json(data));
};

module.exports = { getRegion }