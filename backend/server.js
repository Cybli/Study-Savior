/*
  SETUP
*/

//Cookies
const cookie = require('cookie');
const cookieParser = require('cookie-parser');

//JSON Web Token (for session id generation)
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

//Express
const express = require('express');
const app = express();
const PORT = 4000

//Database
const pool = require('./dbconnector'); //

//Communication to front end
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'http://flip4.engr.oregonstate.edu:4000', 'http://flip3.engr.oregonstate.edu:4000', 'http://flip2.engr.oregonstate.edu:4000', 'http://flip1.engr.oregonstate.edu:4000'],
  credentials: true
}));
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));
app.use(cookieParser())

//Bcrypt hashing
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

/* 
  FUNCTIONS
*/
function generateAuthToken(user) {
  return jwt.sign(
    { id_user: user.id_user, username: user.username_user },
    JWT_SECRET,
    { expiresIn: '8h' }
  );
}

function setAuthCookie(res, token) {
  res.cookie("auth", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
  })
}


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

//Get tags for a specific location
app.get('/locations/:id/tags', async (req, res) => { // /locations/ENTERID/tags
  try {
    const [tags] = await pool.query(
      'SELECT t.id_tag, t.name_tag FROM tag t INNER JOIN location_tags lt ON t.id_tag = lt.tag_id WHERE lt.location_id = ?',
      [req.params.id]
    );
    res.json(tags); // Return the result of the query in json format
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Register new user
/*
Can return 3 things:
  - 'Username already taken'
  - 'Account created successfully'
  - or an error message
*/
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


//Login a user
/*
Can return 3 things:
  - 'Invalid username or password'
  - 'Login successful'
  - or an error message
*/
app.post('/login', async (req, res) => {
  //Init vars to hold username and password
  const { username, password } = req.body;
  try{
    //Find the user
    const [rows] = await pool.query('SELECT * FROM user WHERE username_user = ?', [username]);
    //If no user is found error
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid username or password' });
    
    const user = rows[0];

    //Check for valid password
    const match = await bcrypt.compare(password, user.hashedpass_user);
    if (!match) return res.status(401).json({ error: 'Invalid username or password' });

    //If user is found, set cookies and return their id and username
    setAuthCookie(res, generateAuthToken(user))
    res.json({ message: 'Login successful', id_user: user.id_user, username: user.username_user });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});

//Verify that a user is logged in and has a valid token
/* 
  Can return 3 things:
    - 'Not logged in'
    - 'Verification succesful'
    - 'Invalid or expired token'
*/
app.get('/me', (req, res) => {
  const token = req.cookies.auth;
  if (!token) return res.status(401).json({ error: 'Not logged in' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'Verification successful', id_user: decoded.id_user, username: decoded.username });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

//Logout the user when requested
app.post('/logout', (req, res) => {
  res.clearCookie('auth', { path: '/' });
  res.json({ message: 'Logged out successfully' });
});

//Submit a new rating/review
/*
Can return 3 things:
  - 'Rating submitted successfully'
  - 'You have already reviewed this location' (if duplicate)
  - or an error message
*/
app.post('/ratings', async (req, res) => {
  const { id_location, noise_rating, comfort_rating, crowded_rating, written_rating } = req.body;
  
  // Validate token and extract authenticated user ID
  const token = req.cookies.auth;
  if (!token) return res.status(401).json({ error: 'Not logged in' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const id_user = decoded.id_user; // Use user ID from authenticated token only
    
    // Validate ratings are between 1-5
    if (noise_rating < 1 || noise_rating > 5 || 
        comfort_rating < 1 || comfort_rating > 5 || 
        crowded_rating < 1 || crowded_rating > 5) {
      return res.status(400).json({ error: 'Ratings must be between 1 and 5' });
    }
    
    // Insert the rating into the database
    await pool.query(
      'INSERT INTO rating (id_location, id_user, noise_rating, comfort_rating, crowded_rating, written_rating) VALUES (?, ?, ?, ?, ?, ?)',
      [id_location, id_user, noise_rating, comfort_rating, crowded_rating, written_rating || null]
    );
    
    // Recalculate location averages
    const [avgResults] = await pool.query(
      `SELECT 
        AVG(noise_rating) as avg_noise,
        AVG(comfort_rating) as avg_comfort,
        AVG(crowded_rating) as avg_crowded,
        AVG((noise_rating + comfort_rating + crowded_rating) / 3) as avg_overall
      FROM rating WHERE id_location = ?`,
      [id_location]
    );
    
    // Update location averages
    await pool.query(
      `UPDATE location SET 
        average_noise_location = ?,
        average_comfort_location = ?,
        average_crowded_location = ?,
        average_overall_location = ?
      WHERE id_location = ?`,
      [
        avgResults[0].avg_noise,
        avgResults[0].avg_comfort,
        avgResults[0].avg_crowded,
        avgResults[0].avg_overall,
        id_location
      ]
    );
    
    res.json({ message: 'Rating submitted successfully' });
  } catch (err) {
    // Check for duplicate rating (UNIQUE constraint violation)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'You have already reviewed this location' });
    }
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
