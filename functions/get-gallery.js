const axios = require('axios');

const handler = async (event) => {

    const apiKey = process.env.tmdb_key;
    const {key, isTrending, mediaType, language, page, selectionsQueryString} = event.queryStringParameters;

    const baseURL = 'https://api.themoviedb.org/3';
    const defaultURL = `${baseURL}/trending/${mediaType}/day?api_key=${apiKey}&language=${language}&page=${page}`;
    const userURL = `${baseURL}/discover/${mediaType}?api_key=${apiKey}&${selectionsQueryString}`

    const url = isTrending === 'true' ? defaultURL : userURL;

    try{
        const { data } = await axios.get(url)
        let apiResults = { movieResults: data.results, totalPages: data.total_pages }
      
        return {
            statusCode: 200,
            body: JSON.stringify(apiResults)
        }; 
    }catch(error){
        const { status, statusText, headers, data } = error.response
        return {
            statusCode: status,
            body: JSON.stringify({status, statusText, headers, data})
        }
    }
}

module.exports = { handler }