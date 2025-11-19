# TaskFlow API 🚀

**RESTful backend API for TaskFlow - Node.js/Express server with CRUD operations**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-4.18.2-lightgrey)](https://expressjs.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Deployment](#deployment)

## 🎯 Overview

TaskFlow API is a RESTful backend service built with Node.js and Express that provides complete CRUD (Create, Read, Update, Delete) operations for task management. This API serves as the backend for the TaskFlow Lite application and demonstrates professional API development practices including middleware implementation, error handling, and security best practices.

## ✨ Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, and Delete tasks
- 🔒 **Security Middleware** - Helmet.js for security headers
- 🌐 **CORS Support** - Cross-Origin Resource Sharing enabled
- 📝 **Request Logging** - Morgan middleware for HTTP request logging
- ⚡ **In-Memory Storage** - Fast data access (temporary, database integration in Task 4)
- 🎯 **RESTful Design** - Following REST API conventions
- 🛡️ **Input Validation** - Data sanitization and validation
- 🚨 **Error Handling** - Comprehensive error responses
- 📊 **Proper HTTP Status Codes** - Meaningful response codes

## 🛠️ Tech Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js (v4.18.2)
- **Middleware**:
  - **CORS**: Cross-origin resource sharing
  - **Morgan**: HTTP request logger
  - **Helmet**: Security headers
  - **Express.json**: JSON body parser
- **Development**: Nodemon for auto-restart

## 📁 Project Structure

```
taskflow-api/
├── src/
│   ├── controllers/
│   │   └── taskController.js    # Business logic for CRUD operations
│   ├── routes/
│   │   └── taskRoutes.js        # API route definitions
│   └── middleware/              # Custom middleware (future)
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Project dependencies
├── server.js                     # Application entry point
└── README.md                     # Documentation
```

## 🚀 Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/Tarunadhithya/taskflow-api.git
cd taskflow-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
# Create .env file and set your configuration
cp .env .env.local
# Edit .env.local with your settings
```

4. **Start the server**

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The API will be running at `http://localhost:5000`

## ⚙️ Configuration

Environment variables in `.env`:

```env
PORT=5000                    # Server port
NODE_ENV=development         # Environment (development/production)
API_VERSION=v1               # API version
API_PREFIX=/api              # API route prefix
CORS_ORIGIN=*                # CORS allowed origins
LOGGING_LEVEL=dev            # Morgan logging format
```

## 📡 API Endpoints

### Base URL

```
http://localhost:5000/api/tasks
```

### Endpoints

#### 1. Get All Tasks

```http
GET /api/tasks
```

**Response**: `200 OK`

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "text": "Complete Task 3",
      "completed": false,
      "createdAt": "2025-01-20T10:30:00.000Z"
    }
  ]
}
```

#### 2. Get Single Task

```http
GET /api/tasks/:id
```

**Response**: `200 OK` | `404 Not Found`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Complete Task 3",
    "completed": false,
    "createdAt": "2025-01-20T10:30:00.000Z"
  }
}
```

#### 3. Create New Task

```http
POST /api/tasks
Content-Type: application/json

{
  "text": "New task description",
  "completed": false
}
```

**Response**: `201 Created` | `400 Bad Request`

```json
{
  "success": true,
  "data": {
    "id": 4,
    "text": "New task description",
    "completed": false,
    "createdAt": "2025-01-20T10:35:00.000Z"
  }
}
```

#### 4. Update Task

```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "text": "Updated task text",
  "completed": true
}
```

**Response**: `200 OK` | `404 Not Found` | `400 Bad Request`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Updated task text",
    "completed": true,
    "createdAt": "2025-01-20T10:30:00.000Z"
  }
}
```

#### 5. Delete Task

```http
DELETE /api/tasks/:id
```

**Response**: `204 No Content` | `404 Not Found`

## 💡 Usage Examples

### Using cURL

```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Create a new task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"text":"Learn Express.js","completed":false}'

# Update a task
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"text":"Learn Express.js","completed":true}'

# Delete a task
curl -X DELETE http://localhost:5000/api/tasks/1
```

### Using JavaScript (fetch)

```javascript
// Get all tasks
fetch('http://localhost:5000/api/tasks')
  .then(response => response.json())
  .then(data => console.log(data));

// Create a task
fetch('http://localhost:5000/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'New task', completed: false })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

**Common Error Codes**:

- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

## 🧪 Testing

### Manual Testing

Use Postman, Thunder Client, or cURL to test endpoints.

**Postman Collection**: Import the `Postman_Collection.json` file included in the repository.

### Test Cases

1. ✅ Create task with valid data
2. ✅ Create task with invalid data (missing text)
3. ✅ Get all tasks
4. ✅ Get single task with valid ID
5. ✅ Get single task with invalid ID
6. ✅ Update task with valid data
7. ✅ Update task with invalid ID
8. ✅ Delete task with valid ID
9. ✅ Delete task with invalid ID

## 🌐 Deployment

### Heroku

```bash
heroku create taskflow-api
heroku config:set NODE_ENV=production
git push heroku main
```

### Render

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-frontend-domain.com
```

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

**Tarunadhithya**

- GitHub: [@Tarunadhithya](https://github.com/Tarunadhithya)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ as part of Full Stack Development Task Series**
