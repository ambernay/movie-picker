const axios = require('axios');

const handler = async (event) => {
    const apiKey = process.env.tmdb_key;

    const { searchValue } = event.queryStringParameters;

    const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${apiKey}&language=en-US`;

    try{
        const { data } = await axios.get(searchURL);
        console.log(data);
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