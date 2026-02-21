#!/bin/bash

# make sure to have 'dbconnector.js' installed in your backend directory
# before running this script

# start the server/backend
cd backend
npm install express
npm install cors
npm install mysql2
npm install
node server.js &

# run the frontend
cd ../frontend
npm install
npm run dev