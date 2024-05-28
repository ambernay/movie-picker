const axios = require('axios');

const handler = async (event) => {

    const apiKey = `api_key=${process.env.tmdb_key}`;
    const {isTrending, mediaType, language, page, selectionsQueryString, 
        searchValue, searchState, queryType} = event.queryStringParameters;
   
    const baseURL = 'https://api.themoviedb.org/3';
    const defaultURL = `${baseURL}/trending/${mediaType}/day?${apiKey}&language=${language}&page=${page}`;
    const formURL = `${baseURL}/discover/${mediaType}?${apiKey}&${selectionsQueryString}&page=${page}`;
    const searchBarURL = `${baseURL}/search/${mediaType}?query=${searchValue}&${apiKey}&language=${language}&page=${page}`;
    const searchPeopleURL = `${baseURL}/search/${queryType}?query=${searchValue}&${apiKey}&language=${language}&page=${page}`;
    console.log(searchState, queryType);
    let url;
        if (isTrending === 'true') {url = defaultURL}
        else if (searchState === 'formSearch'){url = formURL}
        else if (searchState === 'searchBar' && queryType !== 'person') {url = searchBarURL}
        else if (searchState === 'searchBar' && queryType === 'person') {url = searchPeopleURL}
    console.log(url);
    try{
        const { data } = await axios.get(url)
        let apiResults = { movieResults: data.results, totalPages: data.total_pages }
        // console.log(data);
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