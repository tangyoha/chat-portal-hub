#!/bin/bash

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Create data directory if it doesn't exist
mkdir -p data

# Run the API
echo "Starting the API server..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000 