const axios = require('axios');

const handler = async (event) => {

    const apiKey = `api_key=${process.env.tmdb_key}`;
    const {mediaType, language, page, selectionsQueryString,
        searchValue, searchState} = event.queryStringParameters;
   
    const baseURL = 'https://api.themoviedb.org/3';
    const defaultURL = `${baseURL}/trending/${mediaType}/day?${apiKey}&language=${language}&page=${page}&include_adult=false`;
    const formURL = `${baseURL}/discover/${mediaType}?${apiKey}&${selectionsQueryString}&page=${page}&include_adult=false`;
    const searchBarURL = `${baseURL}/search/${mediaType}?query=${searchValue}&${apiKey}&language=${language}&page=${page}&include_adult=false`;
    const personURL = `${baseURL}/person/${searchValue}/combined_credits?${apiKey}&language=${language}&page=${page}&include_adult=false`;
    console.log(searchState);
    let url;
        if (searchState === 'trending') {url = defaultURL}
        else if (searchState === 'formSearch'){url = formURL}
        else if(searchState === 'searchBar') {url = searchBarURL}
        else if(searchState === 'person') {url = personURL}

    try{
        const { data } = await axios.get(url)

        const apiResults = (data) => {
            if (data.results) { 
                return({movieResults: data.results, totalPages: data.total_pages})
            }
            // the rest is for search-person-by-id
            else if (data.cast && data.crew) {
                return({movieResults: data.cast.concat(data.crew), totalPages: 1})
            }
            else if (data.cast) {
                return({movieResults: data.cast, totalPages: 1})
            }
            else if (data.crew) {
                return({movieResults: data.crew, totalPages: 1})
            }
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify(apiResults(data))
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