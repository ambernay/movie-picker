const axios = require('axios');

const handler = async (event) => {

    const apiKey = process.env.tmdb_key;
    const {key, isTrending, mediaType, language, page, userSelections} = event.queryStringParameters;
    // const key = req.query.key;
    // const tvOrMovie = req.query.mediaType;
    // const currentPage = req.query.page;
    // const language = req.query.language;
    // const isTrending = req.query.isTrending;
    const userQueries = decodeURIComponent(userSelections);

    const baseURL = 'https://api.themoviedb.org/3';
    const defaultURL = `${baseURL}/trending/${mediaType}/day?api_key=${apiKey}&language=${language}&page=${page}`;
    const userURL = `${baseURL}/discover/${mediaType}?api_key=${apiKey}&${userQueries}`

    const url = isTrending === 'true' ? defaultURL : userURL;

    try{
        const { data } = await axios.get(url)
        
        let apiResults = { movieResults: data.results, totalPages: data.total_pages }
        // console.log(JSON.stringify(data));
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