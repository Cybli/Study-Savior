/*
    SETUP
*/

//Express
const express = require('express');
const app = express();
const PORT = 8210

//Database
const db = require('./dbconnector');

/*
    ROUTES
*/
app.get('/', (req, res) => {
    res.send('Backend running!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
