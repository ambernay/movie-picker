const express = require('express');
const bodyParser = require('body-parser');
const getRegion = require('./routes/getRegion').getRegion;
const getProviderList = require('./routes/getProviderList').getProviderList;
const getGenreList = require('./routes/getGenreList').getGenreList;
const getViewingOptions = require('./routes/getViewingOptions').getViewingOptions;
const getGallery = require('./routes/getGallery').getGallery;

const app = express();
const port = 3001;

// app.use((_req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     next();
// });
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
})
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const jsonParser = bodyParser.json();

let userSelections = {};
app.post("/userParams", jsonParser, function (req, res) {
    userSelections = req.body;
    console.log(userSelections);
    res.send(userSelections);
});


console.log('testing index.js');


// app.post("/api/routes/getGallery", jsonParser, function (req, res) {
//     const userSelections = req.body;
//     const voteCount = req.body.voteCount;
//     const sortOption = req.body.sortOption;
//     const regionCode = req.body.regionCode;
//     const language = req.body.language;

//     res.send({

//         "vote_count.gte": voteCount,
//         "sort_by": sortOption,
//         "watch_region": regionCode,
//         "language": language,
//     });
// });

app.get('/getRegion', getRegion);
app.get('/getProviderList', getProviderList);
app.get('/getGenreList', getGenreList);
app.get('/getViewingOptions', getViewingOptions);
app.get('/getGallery', getGallery);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});