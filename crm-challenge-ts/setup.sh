#!/bin/bash

PG_USER="postgres"

# check if "docker-compose" v(1) exists, if not, try "docker compose" v(2)
if command -v docker-compose; then
  DOCKER_COMPOSE="docker-compose"
else
  DOCKER_COMPOSE="docker compose"
fi

$DOCKER_COMPOSE up -d

# Wait until Postgres is ready
echo "Waiting for Postgres to be ready..."
until $DOCKER_COMPOSE exec postgres pg_isready -U "$PG_USER" > /dev/null 2>&1; do
  sleep 1
done
echo "Postgres is ready."

# Run SQL files inside the container
echo "Creating tables..."
$DOCKER_COMPOSE exec postgres psql -U "$PG_USER" -f /postgres/createTable.sql

echo "Importing CSV..."
$DOCKER_COMPOSE exec postgres psql -U "$PG_USER" -f /postgres/importCustomers.sql

echo "Database setup complete."
