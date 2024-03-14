#!/bin/bash

if grep -q "REPLACE_API_KEY" "./src/firebaseConfig.js"; then
    echo "Please input API key:"
    read apiKey
    # Cross-platform compatibility for in-place sed editing
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS requires a backup extension with -i, even if it's just an empty string ('')
        sed -i '' "s|REPLACE_API_KEY|$apiKey|g" ./src/firebaseConfig.js
    else
        # Linux allows -i without an extension to edit in-place without backup
        sed -i "s|REPLACE_API_KEY|$apiKey|g" ./src/firebaseConfig.js
    fi
fi

npm install
npm start