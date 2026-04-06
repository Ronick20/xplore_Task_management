# Troubleshooting Guide

## Common Issues and Solutions

### Backend Issues

#### 1. MongoDB Connection Error

**Error Message:**

```
MongoDB connection error: MongooseServerSelectionError
```

**This Project Uses MongoDB Atlas (Cloud Database)**

**Solutions:**

- Verify MongoDB Atlas connection string in `.env` file
- Ensure your IP is whitelisted in MongoDB Atlas:
  1. Go to https://cloud.mongodb.com
  2. Select your cluster
  3. Click "Network Access"
  4. Check if your IP is whitelisted (or add 0.0.0.0/0 for development)
- Verify username and password in connection string
- Ensure database name is `task-management`
- Verify `retryWrites=true&w=majority` is in connection string
- Check `.env` file has `MONGODB_URI` set correctly

**Connection String Format:**

```
mongodb+srv://username:password@cluster0.lheagvk.mongodb.net/task-management?retryWrites=true&w=majority
```

**Verify Connection:**

1. Open MongoDB Compass (download from https://www.mongodb.com/products/compass)
2. Paste your connection string
3. Click Connect
4. If successful, you can see your databases and collections

---

#### 2. Port Already in Use

**Error Message:**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

Windows:

```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Mac/Linux:

```bash
lsof -ti:5000 | xargs kill -9
```

Or change port in `.env`:

```
PORT=5001
```

---

#### 3. JWT_SECRET Not Found

**Error Message:**

```
Cannot read property 'split' of undefined
```

**Solution:**
Ensure `.env` file exists with JWT_SECRET:

```
JWT_SECRET=your_secret_key_here
```

---

#### 4. Module Not Found Errors

**Error Message:**

```
Cannot find module 'express'
```

**Solutions:**

```bash
cd backend
npm install

# Or clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

#### 5. Middleware Not Applied

**Issue:** Routes return 401 Unauthorized unexpectedly

**Solution:**
Check that auth middleware is properly applied:

```javascript
// Correct order in routes
router.use(authMiddleware);
router.use(adminMiddleware);
```

---

### Frontend Issues

#### 1. Blank Page (React)

**Solution:**

1. Open Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab to see API calls
4. Clear browser cache
5. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

#### 2. API Calls Return 404

**Error:**

```
POST http://localhost:5000/api/admin/login 404
```

**Solutions:**

- Ensure backend is running on port 5000
- Check proxy setting in `frontend/package.json`
- Verify API endpoint paths are correct
- Check backend routes are properly defined

**Verify proxy in package.json:**

```json
{
  "proxy": "http://localhost:5000"
}
```

---

#### 3. CORS Error

**Error Message:**

```
Access to XMLHttpRequest at 'http://localhost:5000/...' from origin
'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**

- Ensure CORS middleware is enabled in backend
- Check backend is running
- Verify frontend is on correct port

Backend check:

```javascript
const cors = require("cors");
app.use(cors()); // Should be before routes
```

---

#### 4. Login Not Working

**Issue:** Valid credentials but login still fails

**Solutions:**

1. Check if admin exists in database
2. Verify admin was created with default credentials
3. Clear browser storage:
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   ```
4. Check API response in Network tab
5. Ensure password is being hashed correctly

---

#### 5. Can't See Tasks After Assignment

**Solution:**

1. Ensure employee is approved first
2. Refresh page to reload tasks
3. Check console for API errors
4. Verify task was saved in database
5. Check task's `assignedTo` matches employee ID

---

#### 6. Port 3000 Already in Use

**Error Message:**

```
Port 3000 is already in use
```

**Solution:**

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or specify different port
PORT=3001 npm start
```

---

#### 7. Styling Not Loading

**Issue:** Page appears unstyled

**Solutions:**

- Check browser console for CSS errors
- Verify CSS files are in correct locations
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file imports in components
- Verify .env variables are set correctly

---

### Database Issues

#### 1. Cannot Connect with MongoDB Compass

**Solutions:**

1. Verify MongoDB is running
2. Check hostname and port (default: localhost:27017)
3. For Authentication:
   - Enter credentials if enabled
   - Select authentication database
4. For MongoDB Atlas:
   - Use full connection string with credentials
   - Whitelist your IP

---

#### 2. Duplicate Key Error

**Error:**

```
MongoError: E11000 duplicate key error
```

**Solution:**
Database already has document with unique field:

```bash
# Clear all collections
db.admin.deleteMany({})
db.employee.deleteMany({})
db.task.deleteMany({})
```

---

#### 3. Slow Database Queries

**Solution:**
Add indexes to frequently queried fields in Mongoose schema:

```javascript
email: {
  type: String,
  unique: true,
  index: true
}
```

---

### Environment Variables Issues

#### 1. .env File Not Read

**Solution:**

```bash
# Ensure dotenv package is installed
npm install dotenv

# Ensure it's required at top of server.js
require('dotenv').config();
```

---

#### 2. Variables Undefined

**Solution:**

1. Check `.env` file exists in backend folder
2. Verify variable names match (case-sensitive)
3. Restart backend server after .env changes
4. Check for extra spaces in .env

Bad:

```
MONGODB_URI = mongodb://localhost:27017/db
```

Good:

```
MONGODB_URI=mongodb://localhost:27017/db
```

---

### Authentication Issues

#### 1. Token Expired

**Error:**

```
Invalid token
```

**Solution:**

- Tokens expire after 24 hours by default
- Users need to login again
- To extend expiry, change in `adminRoutes.js`:
  ```javascript
  {
    expiresIn: "7d";
  } // 7 days
  ```

---

#### 2. Wrong Role Can Access Protected Routes

**Issue:** Employee accessing admin routes

**Solution:**
Ensure middleware is applied:

```javascript
router.get('/employees', authMiddleware, adminMiddleware, ...)
//                        ↑ Check auth first
//                                      ↑ Then check role
```

---

### Performance Issues

#### 1. Slow Startup

**Solutions:**

- Check MongoDB connection time
- Optimize queries (add indexes)
- Remove unnecessary console.logs in production
- Use `npm run build` for frontend production

---

#### 2. High Memory Usage

**Solution:**

- Check for memory leaks in event listeners
- Use connection pooling
- Clear old log files
- Use tools like `clinic.js` to profile

---

### Deployment Issues

#### 1. Changes Don't Appear After Deploy

**Solution:**

- Clear browser cache (Ctrl+Shift+Delete)
- Ensure frontend rebuild happened
- Check what version is deployed
- Verify environment variables are set

---

#### 2. Database Connection String Invalid in Production

**Solution:**
MongoDB Atlas connection string format:

```
mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

Include in `.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-management?retryWrites=true&w=majority
```

---

## Debug Mode

### Enable Verbose Logging

```javascript
// In server.js
mongoose.set("debug", true);
```

### Check API Requests/Responses

**Browser DevTools → Network tab:**

1. Make API call
2. Find request in Network tab
3. Check Request/Response headers
4. View Response body for errors

---

## Diagnostic Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check if MongoDB running
netstat -tuln | grep 27017

# Check port usage
netstat -ano | findstr :5000

# List running processes
tasklist | findstr node

# Check environment variables
echo %MONGODB_URI%  # Windows
echo $MONGODB_URI  # Mac/Linux
```

---

## Getting Help

If you still need help:

1. **Check Error Message:** Copy exact error message
2. **Check Console:** Browser (F12) and Terminal logs
3. **Check Network Tab:** API responses
4. **Search Issues:** GitHub issues similar to yours
5. **Read Documentation:** Check README and these guides

---

## Report an Issue

Include:

- OS (Windows/Mac/Linux)
- Node version: `node --version`
- npm version: `npm --version`
- Error message (exact text)
- Steps to reproduce
- Relevant code section
- Screenshots if applicable

---

Last Updated: 2024-04-06
