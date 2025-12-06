#!/bin/bash
# Start NAMI locally using Docker Compose

echo "Starting NAMI Local Environment..."
cd infra/docker || exit
docker-compose up -d --build

echo "Services started:"
echo "- Frontend: http://localhost:5173"
echo "- Backend: http://localhost:3000"
echo "- MinIO Console: http://localhost:9001"
echo "waiting for services to stabilize..."
sleep 10
echo "Done."
