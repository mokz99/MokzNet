#!/bin/bash

# Variables
CONTAINER_NAME="mokznet-backend"
IMAGE_NAME="ghcr.io/mokz99/mokznet-backend:latest"
PORT="8081"

# Pull latest image if ./deploy_backend pull is used. 
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
  -p $PORT:$PORT \
  -v /proc:/proc:ro \
  -v /sys:/sys:ro \
  --restart unless-stopped \
  $IMAGE_NAME

echo "✅ Done! Backend is running on port $PORT"
docker ps --filter "name=$CONTAINER_NAME"
