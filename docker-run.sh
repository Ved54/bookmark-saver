#!/bin/bash

echo "🐳 Starting Bookmark Saver Application with Docker..."

# Build and start all services
echo "📦 Building and starting containers..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Show container status
echo "📊 Container Status:"
docker-compose ps

echo "🌟 Application should be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5001"
echo "   Database: localhost:3306"

echo "📝 To view logs:"
echo "   docker-compose logs -f [service_name]"

echo "🛑 To stop all services:"
echo "   docker-compose down"

echo "🔄 To rebuild and restart:"
echo "   docker-compose down && docker-compose up --build -d"
