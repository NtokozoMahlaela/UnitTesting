#!/bin/bash
set -e

# Make gradlew executable
chmod +x backend/gradlew

# Build the application
echo "Building application..."
cd backend
./gradlew clean build -x test --no-daemon
cd ..

echo "Build completed successfully!"
