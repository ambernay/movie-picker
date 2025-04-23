const axios = require('axios');

const handler = async (event) => {

    const apiKey = `api_key=${process.env.tmdb_key}`;
    const {isTrending, mediaType, language, page, selectionsQueryString,
        searchValue, searchState} = event.queryStringParameters;
   
    const baseURL = 'https://api.themoviedb.org/3';
    const defaultURL = `${baseURL}/trending/${mediaType}/day?${apiKey}&language=${language}&page=${page}&include_adult=false`;
    const formURL = `${baseURL}/discover/${mediaType}?${apiKey}&${selectionsQueryString}&page=${page}&include_adult=false`;
    const searchBarURL = `${baseURL}/search/${mediaType}?query=${searchValue}&${apiKey}&language=${language}&page=${page}&include_adult=false`;
    const personURL = `${baseURL}/person/${searchValue}/combined_credits?${apiKey}&language=${language}&page=${page}&include_adult=false`;
    
    let url;
        if (isTrending === 'true') {url = defaultURL}
        else if (searchState === 'formSearch'){url = formURL}
        else if(searchState === 'searchBar') {url = searchBarURL}
        else if(searchState === 'person') {url = personURL}

    try{
        const { data } = await axios.get(url)
        console.log(data.cast ? data.cast.length : 'no');

        let apiResults = { 
            movieResults: data.results? data.results : data.cast, 
            totalPages: data.total_pages ? data.total_pages : 
            data.cast.length > 20 ? Math.ceil(data.cast.length/20) : 1
        }
        
        // const apiResults = function(data, searchState){
        
        //     if(searchState === 'person') {
        //         return ({
        //             movieResults: data.cast, 
        //             totalPages: data.cast.length > 20 ? data.cast.length/20 : 1
        //         })
        //     }
        //     else {
        //         return ({ movieResults: data.results, totalPages: data.total_pages })
        //     }
        // };
        console.log(apiResults);
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