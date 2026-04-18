#!/bin/bash

# Variables
CONTAINER_NAME="mokznet-frontend"
IMAGE_NAME="ghcr.io/mokz99/mokznet-frontend:latest"
PORT="8080"

# Pull latest image if ./deploy_frontend pull is used. 
if [ "$1" == "pull" ]; then
    echo "☁️ Argument 'pull' detected. Fetching latest image..."
    docker pull $IMAGE_NAME
fi

echo "🔄 Stopping old container..."
docker stop $CONTAINER_NAME 2>/dev/null

echo "🗑️ Removing old container..."
docker rm $CONTAINER_NAME 2>/dev/null

echo "🚀 Starting new container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p $PORT:80 \
  --restart unless-stopped \
  $IMAGE_NAME

echo "✅ Done! Frontend is running on port $PORT"
docker ps --filter "name=$CONTAINER_NAME"
