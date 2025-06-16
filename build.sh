#!/bin/bash

# Build the client
echo "Building client..."
npm run build:client

# Copy built files to server/public
echo "Copying files to server/public..."
mkdir -p server/public
cp -r dist/public/* server/public/

# Build the server
echo "Building server..."
npm run build:server

echo "Build complete!"