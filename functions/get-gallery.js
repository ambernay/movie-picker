const axios = require('axios');

const handler = async (event) => {

    const apiKey = `api_key=${process.env.tmdb_key}`;
    const {isTrending, mediaType, language, page, selectionsQueryString, searchValue, searchState} = event.queryStringParameters;
   
    const baseURL = 'https://api.themoviedb.org/3';
    const defaultURL = `${baseURL}/trending/${mediaType}/day?${apiKey}&language=${language}&page=${page}`;
    const formURL = `${baseURL}/discover/${mediaType}?${apiKey}&${selectionsQueryString}`;
    const searchBarURL = `${baseURL}/search/${mediaType}?query=${searchValue}&${apiKey}`;

    const url = () => {
        if (isTrending === 'true') {return defaultURL}
        // else if (isTrending === 'false') {return formURL}
        else if (searchState === 'formSearch'){return formURL}
        else if(searchState === 'searchBar') {return searchBarURL}
    }

    try{
        const { data } = await axios.get(url())
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