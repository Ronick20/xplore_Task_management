# Quick Start Guide

## 🚀 5-Minute Setup

### Prerequisites

- Node.js installed
- MongoDB Atlas account (free) - https://www.mongodb.com/cloud/atlas

### Step 1: Setup MongoDB Atlas

**If you haven't done this yet:**

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier)
3. Create a cluster
4. Create a database user with a password
5. Get connection string and update `backend/.env`:

```env
MONGODB_URI=mongodb+srv://aruddhranagaraj_db_user:1234@cluster0.lheagvk.mongodb.net/task-management?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_this
PORT=5000
NODE_ENV=development
```

**If already done:** Skip this step ✅

### Step 2: Start Backend

```bash
cd backend
npm install
npm start
```

Expected output:

```
Server running on port 5000
MongoDB connected
```

### Step 3: Start Frontend (New Terminal)

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

## 📝 Test the Application

### Test Admin workflow:

1. Click "Admin Login"
2. Use: admin@example.com / admin123
3. You're now in Admin Dashboard

### Test Employee workflow:

1. Click "Employee Register"
2. Fill in the form with test data
3. Select any department
4. Click "Register"
5. Go back to home, click "Admin Login"
6. In "Employee Registrations" tab, click "Approve"
7. Now employee can login with their credentials
8. View assigned tasks and update their status

### Assign a Task:

1. While in Admin Dashboard, go to "Assign Task" tab
2. Fill the form and select an approved employee
3. Click "Assign Task"
4. See the task in "All Tasks" tab
5. Login as the employee to see the assigned task

## 🔧 Commands Reference

### Backend

```bash
npm start          # Start production server
npm run dev        # Start with nodemon (auto-reload)
```

### Frontend

```bash
npm start          # Start development server
npm run build      # Create production build
npm run test       # Run tests
```

## 📚 Default Login Credentials

**Admin:**

- Email: admin@example.com
- Password: admin123

**Test Employee:** (Create your own)

## 🐛 Common Issues & Solutions

| Issue                     | Solution                                                  |
| ------------------------- | --------------------------------------------------------- |
| "Cannot find module"      | Run `npm install` in that directory                       |
| Port 5000 already in use  | Change PORT in backend/.env                               |
| MongoDB connection failed | Ensure mongod is running or check Atlas connection string |
| Blank page on React       | Check browser console (F12) for errors                    |
| API calls failing         | Check browser's Network tab in DevTools                   |

## 📁 Important Files to Check

- `backend/.env` - Configuration variables
- `backend/server.js` - Backend entry point
- `frontend/src/App.js` - Frontend routing
- `frontend/src/services/api.js` - API calls

## 🎯 Key Features to Test

✅ Admin login with default credentials  
✅ Employee registration  
✅ Employee approval by admin  
✅ Task assignment to approved employees  
✅ Employee login after approval  
✅ Task status updates (Pending → In Progress → Completed)  
✅ View all tasks with filters  
✅ Task deletion by admin

## 📊 Testing Data Ideas

**Employee Registration:**

- Name: John Doe
- Email: john@company.com
- Password: test123
- Phone: 1234567890
- Department: IT

**Task Assignment:**

- Title: "Complete Project Proposal"
- Description: "Prepare and submit the Q2 project proposal"
- Priority: High
- Due Date: 2024-04-30

## 🔗 Useful Links

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

---

**Next Steps:** Read the full README.md for detailed documentation!
