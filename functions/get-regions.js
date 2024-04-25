const axios = require('axios');

const handler = async (event) => {
    const apiKey = process.env.tmdb_key;

    // sorts by english_name (instead of country code)
    const sortRegionsByName = (a, z) => a.english_name.localeCompare(z.english_name);

    const regionAPI = `https://api.themoviedb.org/3/watch/providers/regions?api_key=${apiKey}&language=en-US`;

    try{
        const { data } = await axios.get(regionAPI);
        // sorts by english_name (instead of country code)
        const sortedRegionList = data.results.sort(sortRegionsByName);
        
        return {
            statusCode: 200,
            body: JSON.stringify(sortedRegionList)
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