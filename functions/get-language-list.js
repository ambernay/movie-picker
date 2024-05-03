const axios = require('axios');

const handler = async (event) => {
    const apiKey = process.env.tmdb_key;

    // sorts by english_name (instead of country code)
    const sortLanguageByName = (a, z) => a.english_name.localeCompare(z.english_name);

    const languageAPI = `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`;

    try{
        const { data } = await axios.get(languageAPI);
        // sorts by english_name (instead of country code)
        // const sortedLanguageList = data.results.sort(sortLanguageByName);
        return {
            statusCode: 200,
            body: JSON.stringify(data)
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