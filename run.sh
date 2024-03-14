#!/bin/bash
echo "Please input API key"
read $apiKey

sed -i "s/REPLACE_API_KEY/$apiKey/g" firebaseConfig.js

npm install
npm start