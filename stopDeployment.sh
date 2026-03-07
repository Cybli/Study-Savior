#!/bin/bash

# stop the server/backend
cd backend
npx forever stop $(pwd)/server.js
