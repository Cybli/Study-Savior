#!/bin/bash

# make sure to have 'dbconnector.js' installed in your backend directory
# before running this script

# start the server/backend
cd backend
node server.js &

# run the frontend
cd ../frontend
npm run dev