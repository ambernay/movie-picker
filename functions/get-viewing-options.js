const axios = require('axios');

const handler = async (event) => {
    const apiKey = process.env.tmdb_key;
    const {id, mediaType, regionCode} = event.queryStringParameters;

        // there is no way to filter by region (https://www.themoviedb.org/talk/643dbcf75f4b7304e2fe7f2a)
        const viewingOptionsAPI = `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${apiKey}`;

    try {
        const { data } = await axios.get(viewingOptionsAPI);
        
        const emptyObject = {
                    buy_rent: [{ logo_path: 'N/A', provider_id: 'buy/rent_N/A', provider_name: 'N/A' }],
                    stream: [{ logo_path: 'N/A', provider_id: 'stream_N/A', provider_name: 'N/A' }]
                }
        const results = data.results;
        const viewingOptions =  results[regionCode] ? results[regionCode] : emptyObject;

        return {
            statusCode: 200,
            body: JSON.stringify(viewingOptions)
            }
     
    }catch(error){
        const { status, statusText, headers, data } = error.response;
        return {
            statusCode: status,
            body: JSON.stringify({status, statusText, headers, data})
        }
    }
}

module.exports = { handler }