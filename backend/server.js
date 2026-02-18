/*
    SETUP
*/

//Express
const express = require('express');
const app = express();
const PORT = 8210

//Database
const db = require('./dbconnector');

//Communication to front end
const cors = require('cors');
const pool = require('./dbconnector');
app.use(cors());

/*
    ROUTES
*/

//Locations
app.get('/locations', async (req, res) => {
    try{
        //Query the rows from the database
        const [rows] = await pool.query('SELECT * FROM location');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
