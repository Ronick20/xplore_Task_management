# Admin & Employee Task Management System

A comprehensive web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing employee registrations, task assignments, and task tracking.

## Features

### Admin Portal

- Default login access (admin@example.com / admin123)
- View all employee registrations
- Approve or reject employee access
- Assign tasks to approved employees
- Track all tasks and their progress
- Delete tasks as needed

### Employee Portal

- Self-registration with email validation
- Wait for admin approval before login
- View assigned tasks
- Update task status (Pending → In Progress → Completed)
- Track task details and due dates

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, React Router
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Project Structure

```
Task/
├── backend/
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Employee.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   └── employeeRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── EmployeeRegistrations.js
    │   │   ├── TaskAssignment.js
    │   │   ├── TasksList.js
    │   │   └── EmployeeTasks.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── LandingPage.js
    │   │   ├── AdminLogin.js
    │   │   ├── AdminDashboard.js
    │   │   ├── EmployeeRegister.js
    │   │   ├── EmployeeLogin.js
    │   │   └── EmployeeDashboard.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── index.css
    │   │   ├── App.css
    │   │   ├── LandingPage.css
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   └── Components.css
    ├── App.js
    ├── index.js
    └── package.json
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free) - https://www.mongodb.com/cloud/atlas
- Git

## Installation & Setup

### 1. MongoDB Atlas Setup (Required)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a cluster
4. Create a database user with a password
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/task-management`
6. Whitelist your IP Address in Network Access

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Edit .env file and add your MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://aruddhranagaraj_db_user:1234@cluster0.lheagvk.mongodb.net/task-management?retryWrites=true&w=majority

npm start
```

# Create .env file (already provided with defaults)

# Update MONGODB_URI if using MongoDB Atlas

# Update JWT_SECRET with a secure key

# Start the backend server

npm start

# For development with hot reload:

npm run dev

````

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
````

The frontend will run on `http://localhost:3000`

## Configuration

### Backend (.env file)

```env
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key_change_this
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management?retryWrites=true&w=majority
```

## Usage

### Admin Portal

1. **Login**: Visit `http://localhost:3000` → Admin Login
   - Email: `admin@example.com`
   - Password: `admin123`

2. **Employee Registrations**: View pending registrations and approve/reject employees

3. **Assign Task**:
   - Select an approved employee
   - Enter task details (title, description, due date, priority)
   - Submit to assign

4. **All Tasks**: View all assigned tasks, filter by status, and manage tasks

### Employee Portal

1. **Register**: Visit `http://localhost:3000` → Employee Register
   - Fill in all required fields
   - Submit registration

2. **Wait for Approval**: Admin needs to approve your registration

3. **Login**: Login with your credentials after approval

4. **View Tasks**: See all tasks assigned to you

5. **Update Status**: Change task status from Pending → In Progress → Completed

## API Endpoints

### Admin Routes (`/api/admin`)

- `POST /login` - Admin login
- `GET /employees` - Get all employees
- `PUT /employees/:id/approve` - Approve employee
- `PUT /employees/:id/reject` - Reject employee
- `POST /tasks/assign` - Assign task to employee
- `GET /tasks` - Get all tasks
- `DELETE /tasks/:id` - Delete task

### Employee Routes (`/api/employee`)

- `POST /register` - Register new employee
- `POST /login` - Employee login
- `GET /profile` - Get employee profile
- `GET /tasks` - Get assigned tasks
- `PUT /tasks/:id/status` - Update task status

## Default Credentials

**Admin Account:**

- Email: `admin@example.com`
- Password: `admin123`

⚠️ **Important**: Change these credentials in production!

## Database Models

### Admin

```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String (default: 'admin'),
  createdAt: Date
}
```

### Employee

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  department: String,
  isApproved: Boolean (default: false),
  role: String (default: 'employee'),
  registeredAt: Date,
  approvedAt: Date
}
```

### Task

```javascript
{
  title: String,
  description: String,
  assignedTo: ObjectId (Employee reference),
  assignedBy: ObjectId (Admin reference),
  status: String ('Pending', 'In Progress', 'Completed'),
  dueDate: Date,
  priority: String ('Low', 'Medium', 'High'),
  createdAt: Date,
  updatedAt: Date
}
```

## File Descriptions

### Backend Files

- **server.js** - Main server file, initializes Express and MongoDB connection
- **models/** - MongoDB schema definitions
- **routes/** - API endpoints for admin and employee
- **middleware/auth.js** - JWT authentication and role-based middleware

### Frontend Files

- **App.js** - Main React component with routing
- **AuthContext.js** - Global authentication state management
- **api.js** - API service functions for backend communication
- **Pages/** - Full page components for different routes
- **Components/** - Reusable UI components
- **styles/** - CSS files for styling

## Security Considerations

1. **JWT Tokens**: Tokens expire after 24 hours
2. **Password Hashing**: Passwords are hashed using bcryptjs
3. **Role-Based Access**: Middleware ensures users can only access appropriate endpoints
4. **CORS**: Configured to accept requests from frontend

⚠️ **Production Recommendations:**

- Change default admin credentials
- Use strong JWT_SECRET
- Enable HTTPS
- Implement rate limiting
- Add input validation and sanitization
- Use environment variables for sensitive data
- Add logging and monitoring

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- For MongoDB Atlas, whitelist your IP address

### CORS Errors

- Ensure backend is running on port 5000
- Check proxy setting in frontend package.json

### Port Already in Use

```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Dependency Issues

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Future Enhancements

- Email notifications for task assignments
- Task filtering and advanced search
- Task comments and collaboration
- User profile management
- Task analytics and reporting
- Dark mode
- Mobile app
- File attachments for tasks

## License

MIT License

## Support

For issues and questions, please refer to the documentation or create an issue in the repository.

---

# Author

RONICK
M.Sc.,Software Systems
