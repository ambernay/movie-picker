const axios = require('axios');

const handler = async (event) => {
    const apiKey = process.env.tmdb_key;
    const {mediaType, language} = event.queryStringParameters;
    const genreListAPI = `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${apiKey}&language=${language}`;

    try{
        const { data } = await axios.get(genreListAPI);
        const genres = data.genres;

        return {
            statusCode: 200,
            body: JSON.stringify(genres)
          }
    }catch(error){
        const { status, statusText, headers, data } = error.response;
        return {
          statusCode: status,
          body: JSON.stringify({status, statusText, headers, data})
        }
       }
    // genreListPromises[mediaType].then((data) => {
    //     res.json(data)
    // });
}

module.exports = { handler }