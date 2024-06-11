const axios = require('axios');

const handler = async (event) => {
    const apiKey = process.env.tmdb_key;
    const {movieID} = event.queryStringParameters;

    const movieInfoURL= `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`;
 
    try{
        const { data } = await axios.get(movieInfoURL);
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