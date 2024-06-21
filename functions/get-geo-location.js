const axios = require('axios');

const handler = async (event) => {
    const apiKey = process.env.geo_location_key;
    const geoAPI = `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`;
 
    try{
        const { data } = await axios.get(geoAPI);
        
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