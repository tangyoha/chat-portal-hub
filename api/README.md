# Chat Config API

This is a simple API service for saving and loading chat configuration data.

## Features

- Load chat configuration from a JSON file
- Save chat configuration to a JSON file
- RESTful API endpoints for getting and updating the configuration

## API Endpoints

- `GET /api/config` - Get the current chat configuration
- `POST /api/config` - Update the chat configuration

## Running the API

### Using Docker Compose

```bash
docker-compose up -d
```

### Running Locally

1. Install the dependencies:

```bash
pip install -r requirements.txt
```

2. Run the API:

```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000.

## API Documentation

Once the API is running, you can access the auto-generated Swagger documentation at http://localhost:8000/docs. 