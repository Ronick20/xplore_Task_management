# Commands Reference Sheet

## Installation & Setup

### Initial Setup (Windows)

```bash
# Run setup script
setup.bat

# Or manually:
cd backend
npm install
cd ../frontend
npm install
```

### Initial Setup (Mac/Linux)

```bash
# Run setup script
chmod +x setup.sh
./setup.sh

# Or manually:
cd backend
npm install
cd ../frontend
npm install
```

---

## Starting the Application

### Start Backend

```bash
cd backend
npm start              # Production mode

# Or with auto-reload (development)
npm run dev           # Requires nodemon
```

### Start Frontend

```bash
cd frontend
npm start             # Starts on http://localhost:3000
```

### Start MongoDB

#### Local MongoDB

```bash
# Windows
mongod              # Start MongoDB service

# Mac/Linux
brew services start mongodb-community
# Or
mongod --config /usr/local/etc/mongod.conf
```

#### MongoDB Compass (GUI)

```bash
# Download from: https://www.mongodb.com/products/compass
# Connect to: mongodb://localhost:27017
```

---

## Development Commands

### Backend Development

```bash
cd backend

# Install a new package
npm install package-name

# Check code issues
npm list              # List all dependencies

# Update dependencies
npm update

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Frontend Development

```bash
cd frontend

# Install new package
npm install package-name

# Build for production
npm run build

# Analyze bundle size
npm i --save-dev source-map-explorer
npm run build
npx source-map-explorer 'build/static/js/*'
```

---

## Database Commands

### MongoDB Shell Commands

```bash
# Connect to database
mongo                 # Local MongoDB

# Enter in MongoDB shell:
use task-management   # Use database
db.admin.find()      # View all admins
db.employee.find()   # View all employees
db.task.find()       # View all tasks

# Clear collections
db.admin.deleteMany({})
db.employee.deleteMany({})
db.task.deleteMany({})

# Exit MongoDB shell
exit
```

### Backup & Restore

```bash
# Backup
mongodump --uri "mongodb://localhost:27017/task-management" --out ./backup

# Restore
mongorestore --uri "mongodb://localhost:27017" ./backup

# MongoDB Atlas Backup
# Via CLI:
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/task-management"
```

---

## API Testing

### Using cURL

#### Admin Login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

#### Get Employees

```bash
curl -X GET http://localhost:5000/api/admin/employees \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Register Employee

```bash
curl -X POST http://localhost:5000/api/employee/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "test123",
    "phone": "1234567890",
    "department": "IT"
  }'
```

#### Assign Task

```bash
curl -X POST http://localhost:5000/api/admin/tasks/assign \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Task Title",
    "description": "Task Description",
    "assignedTo": "EMPLOYEE_ID",
    "dueDate": "2024-05-31",
    "priority": "High"
  }'
```

---

## Port Management

### Check Port Usage

#### Windows

```bash
# Check if port is in use
netstat -ano | findstr :5000
netstat -ano | findstr :3000
netstat -ano | findstr :27017

# Kill process using port
taskkill /PID <PID_NUMBER> /F
```

#### Mac/Linux

```bash
# Check if port is in use
lsof -i :5000
lsof -i :3000
lsof -i :27017

# Kill process using port
kill -9 <PID>
# Or
lsof -ti:5000 | xargs kill -9
```

---

## Cleaning & Reinstalling

### Clean Install Backend

```bash
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Clean Install Frontend

```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Clear Browser Data

```javascript
// In browser console (F12):
localStorage.clear();
sessionStorage.clear();
// Then refresh page
```

---

## Environment Management

### Set Environment Variables

#### Windows (PowerShell)

```powershell
$env:MONGODB_URI = "mongodb://localhost:27017/task-management"
$env:JWT_SECRET = "your_secret_key"
$env:PORT = 5000
$env:NODE_ENV = "development"
```

#### Mac/Linux

```bash
export MONGODB_URI="mongodb://localhost:27017/task-management"
export JWT_SECRET="your_secret_key"
export PORT=5000
export NODE_ENV="development"
```

#### Create .env file

```bash
# In backend folder
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
EOF
```

---

## Performance Testing

### Using Apache Bench

```bash
# Install (Mac)
brew install httpd

# Test server health
ab -n 1000 -c 10 http://localhost:5000/api/health
```

### Using WRK

```bash
# Install (Mac)
brew install wrk

# Load test
wrk -t12 -c400 -d30s http://localhost:5000/api/health
```

---

## Git Commands

### Initialize and Commit

```bash
git init
git add .
git commit -m "Initial commit: Task Management System setup"
git branch -M main
git remote add origin https://github.com/username/task-management.git
git push -u origin main
```

### Useful Git Commands

```bash
git status                    # Check changes
git log --oneline            # See commit history
git diff                     # See what changed
git stash                    # Temporarily save changes
git branch -a                # List all branches
git checkout -b feature      # Create new branch
git revert HEAD             # Undo last commit
```

---

## Deployment Commands

### Deploy to Heroku

```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create apps
heroku create your-app-name-backend
heroku create your-app-name-frontend

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri --app your-app-name-backend
heroku config:set JWT_SECRET=your_secret_key --app your-app-name-backend

# Deploy
git push heroku main
```

### Deploy to Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Add environment variables
vercel env add REACT_APP_API_URL
```

---

## Docker Commands

### Build and Run with Docker

```bash
# Build
docker-compose build

# Run
docker-compose up

# Stop
docker-compose down

# View logs
docker-compose logs

# Access MongoDB in container
docker exec -it <container_name> mongo
```

---

## Debugging Commands

### Backend Debugging

```bash
# Check what ports are listening
# Windows
netstat -ano | findstr LISTENING

# Mac/Linux
lsof -i -P -n | grep LISTEN
```

### Check System Resources

```bash
# Memory and CPU usage
# Windows
tasklist /v

# Mac/Linux
top
# Or for specific process:
ps aux | grep node
```

---

## File and Directory Commands

### Navigate and Create

```bash
# Create directory
mkdir new-folder

# Create file
touch filename.js

# Copy file
cp source.js destination.js

# Move file
mv old-location/file.js new-location/

# Change permissions
chmod +x setup.sh

# View file contents
cat filename.txt
```

---

## Terminal Shortcuts

### Useful Shortcuts

```bash
Ctrl+C              # Stop running process
Ctrl+Z              # Suspend process
Ctrl+L              # Clear screen
Ctrl+A              # Go to beginning of line
Ctrl+E              # Go to end of line
Ctrl+R              # Search command history
!!                  # Repeat last command
cd -                # Go to previous directory
```

---

## Useful File Paths

```
# Frontend
http://localhost:3000              # Main App
http://localhost:3000/admin/login  # Admin Login
http://localhost:3000/employee/register # Employee Register

# Backend
http://localhost:5000/api/health   # Health check
http://localhost:5000/api/admin/login
http://localhost:5000/api/employee/register

# Database
mongodb://localhost:27017          # Local MongoDB
Compass GUI: http://localhost:3000 (for Compass GUI)
```

---

## Quick Reference Table

| Task                 | Command                          |
| -------------------- | -------------------------------- |
| Install dependencies | `npm install`                    |
| Start backend        | `npm start` (in backend)         |
| Start frontend       | `npm start` (in frontend)        |
| Check MongoDB        | `mongo`                          |
| Stop process         | `Ctrl+C`                         |
| Kill port            | `lsof -ti:PORT \| xargs kill -9` |
| Build frontend       | `npm run build`                  |
| Deploy to Heroku     | `git push heroku main`           |
| View logs            | `docker-compose logs`            |
| Clear cache          | `npm cache clean --force`        |

---

## Emergency Fixes

### Reset Everything

```bash
# Clean everything
rm -rf backend/node_modules frontend/node_modules
rm backend/package-lock.json frontend/package-lock.json

# Reinstall
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Clear MongoDB
mongo
> db.admin.deleteMany({})
> db.employee.deleteMany({})
> db.task.deleteMany({})
> exit

# Restart all services
```

### Fix CORS Issues

Backend `server.js`:

```javascript
const cors = require("cors");
app.use(cors()); // Add before routes
```

### Fix Port Issues

```bash
# Find and kill process
# Windows
netstat -ano | findstr :5000
taskkill /PID 1234 /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

---

## Useful Links

- Node.js Docs: https://nodejs.org/docs/
- npm Official: https://www.npmjs.com/
- MongoDB Docs: https://docs.mongodb.com/
- React Docs: https://react.dev/
- Express Docs: https://expressjs.com/
- Git Documentation: https://git-scm.com/doc

---

## Command Cheat Sheet Summary

```bash
# Setup
npm install (backend + frontend)

# Development
npm start (3 terminals × backend/frontend/mongod)

# Database
mongo (access shell)

# Testing
curl <API_ENDPOINT>

# Deployment
git push heroku main

# Debugging
Ctrl+C (stop), F12 (browser dev tools)

# Clean
rm -rf node_modules package-lock.json && npm install
```

---

**Last Updated:** 2024-04-06

---

Happy Coding! 🚀
