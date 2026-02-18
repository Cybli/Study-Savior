/*
    SETUP
*/

//Express
const express = require('express');
const app = express();
const PORT = 8210

//Database
const pool = require('./dbconnector'); //

//Communication to front end
const cors = require('cors');
app.use(cors());

/*
    ROUTES
*/

//All Locations
app.get('/locations', async (req, res) => { // the /locations address will fetch the locations from the database
    try{
        //Query the rows from the database
        const [rows] = await pool.query('SELECT * FROM location');
        res.json(rows); //Return the result of the query in json format
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Locations with specific id
app.get('/locations/:id', async (req, res) => { // /locations/ENTERID
  try {
    const [rows] = await pool.query('SELECT * FROM location WHERE id_location = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Location not found' }); //Error if location is not found
    res.json(rows[0]); //Return the result of the query in json format
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
