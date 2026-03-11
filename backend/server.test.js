/**
 * server.test.js
 * Jest + Supertest tests for Study Savior backend
 * Run with: npm test
 */

const request = require('supertest');
const { query } = require('./dbconnector');

// =========================
// Mock the Database
// =========================

// Intersept all calls to dbconnector to the mock db
jest.mock('./dbconnector', () => ({
    query: jest.fn()
}))

// Import both the dbconnector and the backend server
const pool = require('./dbconnector');
const app = require('./server');

// Between each test reset the mocks
beforeEach(() => {
    jest.clearAllMocks()
})


// =========================
// Test GET locations
// =========================

describe('GET /locations', () => {
    //Try passing good locations
    it('returns all locations with lat/lang (200)', async () => {
        //Create two fake locations
        const fakeLocations = [
            { id_location: 1, name_location: 'Library', lat: 44.56, lng: -123.27 },
            { id_location: 2, name_location: 'MU',      lat: 44.57, lng: -123.28 },
        ];
        //Pretend the database successfully returned the fake locations
        pool.query.mockResolvedValueOnce([fakeLocations]);
        
        //Request locations from sever.js
        const res = await request(app).get('/locations');

        //Expected outputs
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toHaveProperty('name_location', 'Library');
    });

    //The datase is unreachable
    it('returns 500 on DB error', async () => {
        //Pretend the database cannot be reached
        pool.query.mockRejectedValueOnce(new Error('DB connection failed'));

        //Request locations from sever.js
        const res = await request(app).get('/locations');

        //Expected outputs
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});

// =========================
// Test GET locations/:id
// =========================

describe('GET /locations/:id', () => {
    //Try passing a good location
    it('returns a single location (200)', async () => {
        //Create a good location
        const fakeLocation = { id_location: 1, name_location: 'Library' };
        //Pretend the database successfully returned the fake locations
        pool.query.mockResolvedValueOnce([[fakeLocation]]);

        //Request the location with the ID 1 from server.js
        const res = await request(app).get('/locations/1');

        //Expected outputs
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id_location', 1);
    });

    //Try passing a bad location
    it('returns 404 when location not found', async () => {
        pool.query.mockResolvedValueOnce([[]]); // No locations
        
        //Try and get location with ID 999
        const res = await request(app).get('/locations/999');

        //Expected outputs
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Location not found');
    });

    //The datase is unreachable
    it('returns 500 on DB error', async () => {
        //Pretend the database cannot be reached
        pool.query.mockRejectedValueOnce(new Error('DB error'));

        //Request the location with the ID 1 from server.js
        const res = await request(app).get('/locations/1');

        //Expected outputs
        expect(res.statusCode).toBe(500);
    });
});

// =========================
// Test GET locations/:id/tags
// =========================

describe('GET /locations/:id/tags', () => {
    //Try passing good tags
    it('returns tags for a location (200)', async () => {
        
        //Make fake tags
        const fakeTags = [
            { id_tag: 1, name_tag: 'Quiet' },
            { id_tag: 2, name_tag: 'WiFi'  },
        ];

        //Pretend the databse correctly returned the tags
        pool.query.mockResolvedValueOnce([fakeTags]);

        //Request the tags from server.js
        const res = await request(app).get('/locations/1/tags');

        //Expected outputs
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0]).toHaveProperty('name_tag', 'Quiet');
    });

    //Try passing no tags
    it('returns empty array when no tags exist (200)', async () => {
        pool.query.mockResolvedValueOnce([[]]);

        //Try and get the empty tags from server.js
        const res = await request(app).get('/locations/1/tags');

        //Expected outputs
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(0);
    });
});

// =========================
// Test POST /register
// =========================

describe('POST /register', () => {
    //Try passing valid username
    it('creates a new user successfully (200)', async () => {
        //Pretend username was valid and insert worked
        pool.query
        .mockResolvedValueOnce([[]])          
        .mockResolvedValueOnce([{ insertId: 1 }]); 
        const res = await request(app)
        
        //Send the username and password to server.js
        .post('/register')
        .send({ username: 'sophie', password: 'password123' });

        //Expected outputs
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Account created successfully');
    });

    //Try passing an invald username
    it('rejects a duplicate username (400)', async () => {

        //Pretend the username already exists
        pool.query.mockResolvedValueOnce([[{ id_user: 1, username_user: 'sophie_dev' }]]);

        //Request to add a user with the same name from server.js
        const res = await request(app)
        .post('/register')
        .send({ username: 'sophie_dev', password: 'password123' });

        //Expected outputs
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error', 'Username already taken');
    });

    //The datase is unreachable
    it('returns 500 on DB error', async () => {
        //Pretend the database cannot be reached
        pool.query.mockRejectedValueOnce(new Error('DB error'));

        //Try and reach the database to register a user
        const res = await request(app)
        .post('/register')
        .send({ username: 'sophie', password: 'password123' });

        //Expected output
        expect(res.statusCode).toBe(500);
    });
});
