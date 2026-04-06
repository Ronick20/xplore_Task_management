# API Documentation

## Base URL

```
http://localhost:5000/api
```

**Note:** For testing API endpoints with a visual interface, see [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)

## Database Connection

This API connects to **MongoDB Atlas** (cloud database):

- **Cluster**: cluster0.lheagvk.mongodb.net
- **Database**: task-management
- **Connection**: Managed via `.env` file with `MONGODB_URI` variable

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Admin Routes

### 1. Admin Login

**Endpoint:** `POST /admin/login`

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "objectId",
    "email": "admin@example.com",
    "name": "Administrator",
    "role": "admin"
  }
}
```

**Error (400):**

```json
{
  "message": "Invalid credentials"
}
```

---

### 2. Get All Employees

**Endpoint:** `GET /admin/employees`

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response (200):**

```json
[
  {
    "_id": "objectId",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "department": "IT",
    "isApproved": false,
    "role": "employee",
    "registeredAt": "2024-04-06T10:00:00.000Z",
    "approvedAt": null
  }
]
```

---

### 3. Approve Employee

**Endpoint:** `PUT /admin/employees/:id/approve`

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response (200):**

```json
{
  "message": "Employee approved successfully",
  "employee": {
    "_id": "objectId",
    "name": "John Doe",
    "email": "john@example.com",
    "isApproved": true,
    "approvedAt": "2024-04-06T10:30:00.000Z"
  }
}
```

---

### 4. Reject Employee

**Endpoint:** `PUT /admin/employees/:id/reject`

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response (200):**

```json
{
  "message": "Employee rejected",
  "employee": {...}
}
```

---

### 5. Assign Task

**Endpoint:** `POST /admin/tasks/assign`

**Headers:**

```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "Complete Project Proposal",
  "description": "Prepare and submit the Q2 project proposal",
  "assignedTo": "employeeObjectId",
  "dueDate": "2024-04-30",
  "priority": "High"
}
```

**Response (200):**

```json
{
  "message": "Task assigned successfully",
  "task": {
    "_id": "objectId",
    "title": "Complete Project Proposal",
    "description": "Prepare and submit the Q2 project proposal",
    "assignedTo": {
      "_id": "objectId",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "status": "Pending",
    "priority": "High",
    "dueDate": "2024-04-30T00:00:00.000Z",
    "createdAt": "2024-04-06T10:00:00.000Z"
  }
}
```

**Error (400):**

```json
{
  "message": "Employee not found or not approved"
}
```

---

### 6. Get All Tasks

**Endpoint:** `GET /admin/tasks`

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response (200):**

```json
[
  {
    "_id": "objectId",
    "title": "Task Title",
    "description": "Task Description",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2024-04-30T00:00:00.000Z",
    "assignedTo": {
      "_id": "objectId",
      "name": "John Doe",
      "email": "john@example.com",
      "department": "IT"
    },
    "assignedBy": {
      "_id": "objectId",
      "name": "Administrator",
      "email": "admin@example.com"
    },
    "createdAt": "2024-04-06T10:00:00.000Z",
    "updatedAt": "2024-04-06T10:00:00.000Z"
  }
]
```

---

### 7. Delete Task

**Endpoint:** `DELETE /admin/tasks/:id`

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response (200):**

```json
{
  "message": "Task deleted successfully",
  "task": {...}
}
```

---

## Employee Routes

### 1. Employee Registration

**Endpoint:** `POST /employee/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "department": "IT"
}
```

**Response (201):**

```json
{
  "message": "Registration successful. Please wait for admin approval.",
  "employee": {
    "id": "objectId",
    "name": "John Doe",
    "email": "john@example.com",
    "department": "IT",
    "isApproved": false
  }
}
```

**Error (400):**

```json
{
  "message": "Email already registered"
}
```

---

### 2. Employee Login

**Endpoint:** `POST /employee/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "employee": {
    "id": "objectId",
    "name": "John Doe",
    "email": "john@example.com",
    "department": "IT",
    "role": "employee"
  }
}
```

**Error (403):**

```json
{
  "message": "Your account is pending admin approval. Please contact the administrator."
}
```

---

### 3. Get Employee Profile

**Endpoint:** `GET /employee/profile`

**Headers:**

```
Authorization: Bearer <employee_token>
```

**Response (200):**

```json
{
  "_id": "objectId",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "department": "IT",
  "isApproved": true,
  "role": "employee",
  "registeredAt": "2024-04-06T10:00:00.000Z",
  "approvedAt": "2024-04-06T10:30:00.000Z"
}
```

---

### 4. Get Assigned Tasks

**Endpoint:** `GET /employee/tasks`

**Headers:**

```
Authorization: Bearer <employee_token>
```

**Response (200):**

```json
[
  {
    "_id": "objectId",
    "title": "Task Title",
    "description": "Task Description",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2024-04-30T00:00:00.000Z",
    "assignedBy": {
      "_id": "objectId",
      "name": "Administrator",
      "email": "admin@example.com"
    },
    "createdAt": "2024-04-06T10:00:00.000Z",
    "updatedAt": "2024-04-06T10:00:00.000Z"
  }
]
```

---

### 5. Update Task Status

**Endpoint:** `PUT /employee/tasks/:id/status`

**Headers:**

```
Authorization: Bearer <employee_token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "status": "In Progress"
}
```

**Valid Status Values:**

- `Pending`
- `In Progress`
- `Completed`

**Response (200):**

```json
{
  "message": "Task status updated successfully",
  "task": {
    "_id": "objectId",
    "title": "Task Title",
    "status": "In Progress",
    "updatedAt": "2024-04-06T11:00:00.000Z"
  }
}
```

**Error (400):**

```json
{
  "message": "Invalid status"
}
```

**Error (403):**

```json
{
  "message": "Unauthorized"
}
```

---

## Error Responses

### Unauthorized (401)

```json
{
  "message": "No token provided"
}
```

or

```json
{
  "message": "Invalid token"
}
```

### Forbidden (403)

```json
{
  "message": "Access denied. Admin only."
}
```

or

```json
{
  "message": "Access denied. Employee only."
}
```

### Server Error (500)

```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Testing with cURL

### Admin Login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Get Employees (requires token)

```bash
curl -X GET http://localhost:5000/api/admin/employees \
  -H "Authorization: Bearer <your_token>"
```

### Employee Registration

```bash
curl -X POST http://localhost:5000/api/employee/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "department": "IT"
  }'
```

---

## Rate Limiting & Best Practices

- Keep tokens secure - never expose in logs or frontend code
- Implement rate limiting in production
- Always validate input on both client and server
- Use HTTPS in production
- Store sensitive data in environment variables
- Implement request timeouts
- Log all authentication failures

---

## Status Codes Reference

| Code | Meaning                                          |
| ---- | ------------------------------------------------ |
| 200  | OK - Request successful                          |
| 201  | Created - Resource successfully created          |
| 400  | Bad Request - Invalid input or validation error  |
| 401  | Unauthorized - Missing or invalid authentication |
| 403  | Forbidden - Authenticated but lacks permission   |
| 404  | Not Found - Resource doesn't exist               |
| 500  | Server Error - Internal server error             |

---

Last Updated: 2024-04-06
