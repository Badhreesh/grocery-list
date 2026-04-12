#!/bin/sh

# Wait for Postgres to be ready
echo "Waiting for postgres..."
python -c  "
import socket
import time

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
while True:
    try:
        s.connect(('db', 5432))
        s.close()
        break
    except socket.error:
        time.sleep(0.1)
"
echo "PostgreSQL started"

# Run migrations
echo "Applying database migrations..."
flask db upgrade

# Start the Flask application
echo "Starting Flask server..."
exec flask run --host=0.0.0.0 --debug
