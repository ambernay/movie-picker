const express = require('express');
const getRegion = require('./routes/getRegion').getRegion;

const app = express();
const port = 3001;

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    next();
});

app.get('/api', (req, res) => {
    res.send(apiKey);
});

app.get('/region', getRegion);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});