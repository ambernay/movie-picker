const apiKey = require('./apikey');
const axios = require('axios');

let providerIconPromises = {};
const getViewingOptions = (req, res) => {
    const key = req.query.id;
    const tvOrMovie = req.query.mediaType;
    const regionCode = req.query.regionCode;
    if (!providerIconPromises.hasOwnProperty(key)) {
        // there is no way to filter by region (https://www.themoviedb.org/talk/643dbcf75f4b7304e2fe7f2a)
        const viewingOptionsAPI = `https://api.themoviedb.org/3/${tvOrMovie}/${key}/watch/providers?api_key=${apiKey}`;
        console.log(viewingOptionsAPI);
        providerIconPromises[key] = axios.get(viewingOptionsAPI)
            .then(response => {

                const emptyObject = {
                    buy_rent: [{ logo_path: 'N/A', provider_id: 'buy/rent_N/A', provider_name: 'N/A' }],
                    stream: [{ logo_path: 'N/A', provider_id: 'stream_N/A', provider_name: 'N/A' }]
                }
                const viewingOptions = response.data.results;
                return (viewingOptions[regionCode] ? viewingOptions[regionCode] : emptyObject);
            }).catch((err) => {
                console.log('Failed to fetch provider icons', err);
            })
    }
    providerIconPromises[key].then((data) => {
        res.json(data)
    });
}

module.exports = { getViewingOptions }