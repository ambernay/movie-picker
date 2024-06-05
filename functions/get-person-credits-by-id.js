const axios = require('axios');

const handler = async (event) => {

    const apiKey = `api_key=${process.env.tmdb_key}`;
    const {queryType, language, page, personID} = event.queryStringParameters;
    console.log(personID);
    const baseURL = 'https://api.themoviedb.org/3';
    const creditsByIdURL = `${baseURL}/${queryType}/${personID}/combined_credits?${apiKey}&language=${language}&page=${page}`;
    console.log(creditsByIdURL);
    try{
        const { data } = await axios.get(creditsByIdURL)
        // let apiResults = { movieResults: data.results, totalPages: data.total_pages }
        // console.log(data);
        return {
            statusCode: 200,
            body: JSON.stringify(data)
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