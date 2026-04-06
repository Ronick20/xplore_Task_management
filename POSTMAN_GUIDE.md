# Postman API Testing Guide

## What is Postman?

Postman is a tool for testing APIs without writing code. It allows you to send HTTP requests and see responses.

**Download**: https://www.postman.com/downloads/

---

## Setup Postman

### 1. Install Postman

- Download from https://www.postman.com/downloads/
- Install and open

### 2. Create a New Workspace

- Click **"Create Workspace"**
- Name it: `Task Management System`
- Click **Create**

### 3. Create a New Collection

- Click **"New"** → **"Collection"**
- Name: `Task Management API`
- Click **Create**

---

## Environment Setup (Important!)

### Create an Environment Variable for Your Base URL

1. Click **"Environments"** (left sidebar)
2. Click **"+"** to create new
3. Name it: `Local Development`
4. Add variable:
   - **Variable**: `base_url`
   - **Value**: `http://localhost:5000/api`
5. Click **Save**

### Add Token Variable (for authenticated requests)

In the same environment, add another variable:

- **Variable**: `token`
- **Value**: (leave empty for now - we'll get this from login)
- Click **Save**

### Select Your Environment

In Postman, top-right corner, select **"Local Development"** from the dropdown

---

## API Test Cases

### 1. Admin Login

**Type**: `POST`

**URL**: `{{base_url}}/admin/login`

**Headers**:

```
Content-Type: application/json
```

**Body** (raw JSON):

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Expected Response** (200):

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "...",
    "email": "admin@example.com",
    "name": "Administrator",
    "role": "admin"
  }
}
```

**After getting response:**

1. Copy the `token` value
2. Go to **"Environments"**
3. Paste token in `token` variable
4. Save

---

### 2. Get All Employees

**Type**: `GET`

**URL**: `{{base_url}}/admin/employees`

**Headers**:

```
Authorization: Bearer {{token}}
```

**Body**: None

**Expected Response** (200):

```json
[
  {
    "_id": "...",
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

### 3. Employee Registration

**Type**: `POST`

**URL**: `{{base_url}}/employee/register`

**Headers**:

```
Content-Type: application/json
```

**Body** (raw JSON):

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "9876543210",
  "department": "HR"
}
```

**Expected Response** (201):

```json
{
  "message": "Registration successful. Please wait for admin approval.",
  "employee": {
    "id": "...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "department": "HR",
    "isApproved": false
  }
}
```

---

### 4. Approve Employee

**Type**: `PUT`

**URL**: `{{base_url}}/admin/employees/{employeeId}/approve`

**Headers**:

```
Authorization: Bearer {{token}}
```

**Body**: None

**Note**: Replace `{employeeId}` with actual employee ID from Step 2 list

**Expected Response** (200):

```json
{
  "message": "Employee approved successfully",
  "employee": {
    "_id": "...",
    "name": "Jane Smith",
    "isApproved": true,
    "approvedAt": "2024-04-06T11:00:00.000Z"
  }
}
```

---

### 5. Assign Task

**Type**: `POST`

**URL**: `{{base_url}}/admin/tasks/assign`

**Headers**:

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body** (raw JSON):

```json
{
  "title": "Complete Project Proposal",
  "description": "Prepare and submit the Q2 project proposal",
  "assignedTo": "EMPLOYEE_ID_HERE",
  "dueDate": "2024-05-31",
  "priority": "High"
}
```

**Note**: Replace `EMPLOYEE_ID_HERE` with actual employee ID

**Expected Response** (200):

```json
{
  "message": "Task assigned successfully",
  "task": {
    "_id": "...",
    "title": "Complete Project Proposal",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2024-05-31T00:00:00.000Z"
  }
}
```

---

### 6. Get All Tasks (Admin)

**Type**: `GET`

**URL**: `{{base_url}}/admin/tasks`

**Headers**:

```
Authorization: Bearer {{token}}
```

**Body**: None

**Expected Response** (200):

```json
[
  {
    "_id": "...",
    "title": "Task Title",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2024-05-31T00:00:00.000Z"
  }
]
```

---

### 7. Employee Login

**Type**: `POST`

**URL**: `{{base_url}}/employee/login`

**Headers**:

```
Content-Type: application/json
```

**Body** (raw JSON):

```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

**Expected Response** (200):

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "employee": {
    "id": "...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "department": "HR"
  }
}
```

---

### 8. Get Employee Tasks

**Type**: `GET`

**URL**: `{{base_url}}/employee/tasks`

**Headers**:

```
Authorization: Bearer {{token}}
```

**Body**: None

**Note**: Use employee's token from Step 7

**Expected Response** (200):

```json
[
  {
    "_id": "...",
    "title": "Complete Project Proposal",
    "description": "...",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2024-05-31T00:00:00.000Z"
  }
]
```

---

### 9. Update Task Status

**Type**: `PUT`

**URL**: `{{base_url}}/employee/tasks/{taskId}/status`

**Headers**:

```
Authorization: Bearer {{token}}
Content-Type: application/json
```

**Body** (raw JSON):

```json
{
  "status": "In Progress"
}
```

**Note**: Replace `{taskId}` with actual task ID

**Status Options**: `Pending`, `In Progress`, `Completed`

**Expected Response** (200):

```json
{
  "message": "Task status updated successfully",
  "task": {
    "_id": "...",
    "title": "Complete Project Proposal",
    "status": "In Progress",
    "updatedAt": "2024-04-06T12:00:00.000Z"
  }
}
```

---

## Complete Test Flow

Follow this order to test the entire system:

1. **Admin Login** (Step 1) → Copy token
2. **Get Employees** (Step 2) → See pending registrations
3. **Employee Registration** (Step 3) → Create test employee
4. **Approve Employee** (Step 4) → Use employee ID from Step 3
5. **Assign Task** (Step 5) → Use employee ID from Step 4
6. **Get All Tasks** (Step 6) → See assigned task
7. **Employee Login** (Step 7) → Use new employee credentials
8. **Get Employee Tasks** (Step 8) → See assigned task
9. **Update Task Status** (Step 9) → Change to "In Progress"

---

## Postman Collections (Export/Import)

### Export Your Tests

1. Right-click your collection
2. Click **"Export"**
3. Save as `.json`
4. Share with team

### Import Tests

1. Click **"Import"** (top left)
2. Select exported `.json` file
3. Collection appears in Postman

---

## Common Issues

| Issue              | Solution                             |
| ------------------ | ------------------------------------ |
| `ECONNREFUSED`     | Backend not running (`npm start`)    |
| `401 Unauthorized` | Token invalid/expired - login again  |
| `404 Not Found`    | Wrong URL or endpoint doesn't exist  |
| `500 Server Error` | Check backend console for errors     |
| `CORS Error`       | Backend CORS issue - check server.js |

---

## Tips & Tricks

### 1. Pre-request Scripts (Auto Token)

Add this to automatically add token to all requests:

```javascript
pm.sendRequest(
  {
    url: pm.environment.get("base_url") + "/admin/login",
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: {
      mode: "raw",
      raw: JSON.stringify({
        email: "admin@example.com",
        password: "admin123",
      }),
    },
  },
  function (err, response) {
    if (!err) {
      pm.environment.set("token", response.json().token);
    }
  },
);
```

### 2. Save Request Responses

- Click **"Save Response"** after each request
- Click **"Save as Example"**
- Useful for documentation

### 3. Test Assertions

Add tests to verify responses:

```javascript
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Response contains token", function () {
  pm.expect(pm.response.json()).to.have.property("token");
});
```

---

## API Endpoints Summary

| Method | Endpoint                       | Auth Required | Purpose               |
| ------ | ------------------------------ | ------------- | --------------------- |
| POST   | `/admin/login`                 | No            | Admin login           |
| GET    | `/admin/employees`             | Yes (Admin)   | View all employees    |
| PUT    | `/admin/employees/:id/approve` | Yes (Admin)   | Approve employee      |
| PUT    | `/admin/employees/:id/reject`  | Yes (Admin)   | Reject employee       |
| POST   | `/admin/tasks/assign`          | Yes (Admin)   | Assign task           |
| GET    | `/admin/tasks`                 | Yes (Admin)   | View all tasks        |
| DELETE | `/admin/tasks/:id`             | Yes (Admin)   | Delete task           |
| POST   | `/employee/register`           | No            | Employee registration |
| POST   | `/employee/login`              | No            | Employee login        |
| GET    | `/employee/profile`            | Yes (Emp)     | Get profile           |
| GET    | `/employee/tasks`              | Yes (Emp)     | View assigned tasks   |
| PUT    | `/employee/tasks/:id/status`   | Yes (Emp)     | Update task status    |

---

## Next Steps

1. **Download Postman** from https://www.postman.com/downloads/
2. **Follow the test flow** above
3. **Verify all responses** match expected format
4. **Save your collection** for future use
5. **Share collection** with your team

---

## Resources

- Postman Docs: https://learning.postman.com/
- API Documentation: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- cURL Examples: See [API_DOCUMENTATION.md#testing-with-curl](API_DOCUMENTATION.md#testing-with-curl)

---

**Happy Testing!** 🚀
