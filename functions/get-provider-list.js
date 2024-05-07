const axios = require('axios');

const handler = async (event) => {
    const apiKey = process.env.tmdb_key;

    try{
        // codes are the same between movie and tv
        const providerListAPI = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}&language=de`;
      
        const { data } = await axios.get(providerListAPI);
        //  filter api request for specific providers
        // appletv:2, netflix:8, tubi:73, amazon:119, crave:230, disney:337,paramount:531
        const selectionOfProviders = data.results.filter((provider) => {
            return [2, 8, 73, 119, 230, 337, 531].includes(provider.provider_id)
        });

        return {
            statusCode: 200,
            body: JSON.stringify(selectionOfProviders)
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
