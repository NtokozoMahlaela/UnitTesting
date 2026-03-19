#!/bin/bash
set -e

# Build the backend
echo "Building backend..."
cd backend
./gradlew clean build -x test
cd ..

echo "Build completed successfully!"
