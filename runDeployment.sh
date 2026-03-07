#!/bin/bash

# make sure to have 'dbconnector.js' installed in your backend directory
# before running this script

# run the frontend
cd frontend
npm install
npm run build

# start the server/backend
cd ../backend
npm install
npx forever start $(pwd)/server.js