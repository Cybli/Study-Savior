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

    //Try passing bad locations
    it('returns 500 on DB error', async () => {
        //Pretend the database rejected the locations request
        pool.query.mockRejectedValueOnce(new Error('DB connection failed'));

        //Request locations from sever.js
        const res = await request(app).get('/locations');

        //Expected outputs
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
})