# Postman API Files

This folder contains Postman collection and environment files for testing the Task Management API.

## Files Included

### 1. `Task_Management_API_Collection.postman_collection.json`

Pre-configured collection with all API endpoints:

- **Admin Routes** (7 endpoints)
- **Employee Routes** (5 endpoints)

### 2. `Environment_Local.postman_environment.json`

Environment configuration for local development:

- `base_url`: http://localhost:5000/api
- `token`: (auto-populate after login)
- `admin_token`: (optional - for storing admin token)
- `employee_token`: (optional - for storing employee token)

## How to Use

### Step 1: Import Collection

1. Open Postman
2. Click **Import** (top-left)
3. Select `Task_Management_API_Collection.postman_collection.json`
4. Collection appears in left sidebar

### Step 2: Import Environment

1. Click **Environments** (left sidebar)
2. Click **Import**
3. Select `Environment_Local.postman_environment.json`
4. Select environment from top-right dropdown

### Step 3: Run Tests

1. Select the environment (top-right)
2. Login first: **Admin Login** or **Employee Login**
3. Token automatically saved to environment
4. Use other endpoints with authorization

## Saving Your Test Runs (Optional)

After running tests, you can export responses:

1. **Export Response:**
   - Click **Save Response** under request
   - Click **Save as Example**
   - Name it (e.g., "Admin Login - Success")

2. **Export Collection:**
   - Right-click collection
   - Click **Export**
   - Save as JSON
   - Place in this folder for future reference

## Authentication Flow

1. **Admin Login**
   - Email: admin@example.com
   - Password: admin123
   - Saves token to `{{admin_token}}`

2. **Employee Login**
   - Register employee first (if needed)
   - Use registered email and password
   - Saves token to `{{employee_token}}`

3. **Use Token**
   - Header: `Authorization: Bearer {{token}}`
   - Variable `{{token}}` auto-populated after login

## Endpoint Summary

### Admin Routes

- `POST /admin/login` - Login as admin
- `GET /admin/employees` - View all employees
- `PUT /admin/employees/:id/approve` - Approve employee
- `PUT /admin/employees/:id/reject` - Reject employee
- `POST /admin/tasks/assign` - Assign task
- `GET /admin/tasks` - View all tasks
- `DELETE /admin/tasks/:id` - Delete task

### Employee Routes

- `POST /employee/register` - Register as employee
- `POST /employee/login` - Login as employee
- `GET /employee/profile` - View own profile
- `GET /employee/tasks` - View assigned tasks
- `PUT /employee/tasks/:id/status` - Update task status

## Troubleshooting

| Issue            | Solution                                            |
| ---------------- | --------------------------------------------------- |
| 404 Not Found    | Backend not running (`npm start` in backend folder) |
| 401 Unauthorized | Token expired or missing - login again              |
| ECONNREFUSED     | Backend not running on port 5000                    |
| Invalid JSON     | Check request body formatting                       |

## Next Steps

1. Import collection and environment
2. Run **Admin Login** first
3. Follow test flow in [POSTMAN_GUIDE.md](../POSTMAN_GUIDE.md)
4. Export and save responses in this folder for reference

---

**Need help?** See [POSTMAN_GUIDE.md](../POSTMAN_GUIDE.md) for detailed guide.
