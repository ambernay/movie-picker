const axios = require('axios');

const handler = async (event) => {

    const apiKey = `api_key=${process.env.tmdb_key}`;
    const {queryType, searchValue, language, page } = event.queryStringParameters;
   
    const baseURL = 'https://api.themoviedb.org/3';
    const searchBarURL = `${baseURL}/search/${queryType}?query=${searchValue}&${apiKey}&language=${language}&page=${page}`;
    // const creditsByIDURL = `${baseURL}/search/${queryType}/${personID}/combined_credits?${apiKey}&language=${language}&page=${page}`;

    console.log(searchBarURL);
    try{
        const { data } = await axios.get(searchBarURL)
        // const personID = data.results[0].id;
        console.log(data);


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