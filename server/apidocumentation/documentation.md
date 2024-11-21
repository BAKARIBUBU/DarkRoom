#### DarkRoom API Documentation
## Overview
The DarkRoom API is a RESTful service designed to manage interactions for a movie club application. It allows users to create and manage accounts, follow other users, create and manage clubs, post movie reviews, rate movies, and comment on posts. The API uses JWT (JSON Web Tokens) for authentication and provides a structured way to interact with the underlying data models.

# Base URL

https://darkroombackend.onrender.com

# Authentication
All requests that modify data (POST, PATCH, DELETE) require a valid JWT access token. The token should be included in the Authorization header in the following format:

Authorization: Bearer <your_access_token>

# Content-Type
All requests that send data should have the following header:
Content-Type: application/json

## Endpoints
User Management
1. Create User
Endpoint: /users
Method: POST
Description: Creates a new user account.
Request Body:

{
    "username": "string",
    "email": "string"
}
Response:
Success (201):

{
    "message": "User  created successfully",
    "status": 201,
    "data": {
        "id": "integer",
        "username": "string",
        "email": "string"
    }
}
Error (400):

{
    "message": "Missing required fields or email already exists",
    "status": 400
}

2. Get All Users
Endpoint: /users
Method: GET
Description: Retrieves a list of all registered users.
Response:
Success (200):

{
    "message": "Users fetched successfully",
    "status": 200,
    "data": [
        {
            "id": "integer",
            "username": "string",
            "email": "string"
        }
    ]
}
3. Get User by ID
Endpoint: /users/<int:id>
Method: GET
Description: Retrieves details of a specific user by ID.
Response:
Success (200):

{
    "message": "User  fetched successfully",
    "status": 200,
    "data": {
        "id": "integer",
        "username": "string",
        "email": "string"
    }
}
Error (404):

{
    "message": "User  not found",
    "status": 404
}
4. Update User
Endpoint: /users/<int:id>
Method: PATCH
Description: Updates details of a specific user.
Request Body:

{
    "username": "string",
    "email": "string",
    "profile_picture": "string"
}
Response:
Success (200):

{
    "message": "User  updated successfully",
    "status": 200,
    "data": {
        "id": "integer",
        "username": "string",
        "email": "string"
    }
}
Error (404):

{
    "message": "User  not found",
    "status": 404
}
5. Delete User
Endpoint: /users/<int:id>
Method: DELETE
Description: Deletes a user account.
Response:
Success (200):

{
    "message": "User  successfully deleted",
    "status": 200
}
Error (404):

{
    "message": "User  not found",
    "status": 404
}
Authentication
6. User Registration
Endpoint: /register
Method: POST
Description: Registers a new user and returns an access token.
Request Body:

{
    "username": "string",
    "email": "string",
    "password": "string"
}
Response:
Success (201):

{
    "message": "User  registered successfully",
    "status": 201,
    "data": {
        "id": "integer",
        "username": "string",
        "email": "string"
    },
    "access_token": "string
