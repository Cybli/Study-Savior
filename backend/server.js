/*
    SETUP
*/

//Express
const express = require('express');
const app = express();
const PORT = 4000

//Database
const pool = require('./dbconnector'); //

//Communication to front end
const cors = require('cors');
app.use(cors());

//Bcrypt hashing
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

/*
    ROUTES
*/

//All Locations
app.get('/locations', async (req, res) => { // the /locations address will fetch the locations from the database
    try{
        //Query the rows from the database and convert single POINT to lng and lat
        const [rows] = await pool.query('SELECT *, ST_X(coordinates_location) as lat, ST_Y(coordinates_location) as lng FROM location');
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

//Register new user
app.post('/register', async (req, res) => {
    //Init vars to hold username and password
    const { username, password } = req.body;
    try {
        //Check is username has been taken
        const [existing] = await pool.query('SELECT * FROM user WHERE username_user = ?', [username]);
        //If any matching usernames are found send error
        if (existing.length > 0) return res.status(400).json({ error: 'Username already taken' });

        //Generate salt
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        //Hash password
        const hashedPassword = await bcrypt.hash(password, salt);

        //Insert into db
        await pool.query(
           'INSERT INTO user (username_user, salt_user, hashedpass_user) VALUES (?, ?, ?)',
            [username, salt, hashedPassword] 
        );

        res.json({ message: 'Account created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
