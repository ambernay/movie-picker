const axios = require('axios');

const handler = async (event) => {
    const apiKey = process.env.tmdb_key;
    const {personID} = event.queryStringParameters;

    const personInfoURL= `https://api.themoviedb.org/3/person/${personID}/combined_credits?api_key=${apiKey}`;
 
    try{
        const { data } = await axios.get(personInfoURL);
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