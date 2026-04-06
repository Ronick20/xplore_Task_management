# Testing Guide

## Manual Testing Workflow

### Prerequisites

- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- **MongoDB Atlas** connection configured (cloud database - already set up in `.env`)
- Browser DevTools ready (F12)
- Optional: Postman installed for API testing (see [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md))

---

## Test Case 1: Admin Login

**Objective:** Verify admin can login with default credentials

**Steps:**

1. Navigate to `http://localhost:3000`
2. Click "Admin Login" button
3. Enter credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
4. Click "Login"

**Expected Result:**

- Redirects to Admin Dashboard
- URL changes to `/admin/dashboard`
- "Employee Registrations", "Assign Task", "All Tasks" tabs visible
- Username displays at top
- Logout button visible

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 2: Admin Logout

**Objective:** Verify admin can logout and return to home

**Prerequisites:** Logged in as admin

**Steps:**

1. Click "Logout" button
2. Observe redirect

**Expected Result:**

- Redirects to landing page
- URL changes to `/`
- Can see admin/employee portals again
- Token cleared from localStorage

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 3: Employee Registration

**Objective:** Verify employee can register

**Steps:**

1. Navigate to `http://localhost:3000`
2. Click "Register" in Employee Portal
3. Fill form with test data:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `test123`
   - Phone: `9876543210`
   - Department: `IT`
4. Click "Register"

**Expected Result:**

- Success message: "Registration successful..."
- Redirects to employee login page
- Data saved in MongoDB

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 4: Duplicate Email Registration

**Objective:** Verify duplicate email is rejected

**Prerequisites:** Previous registration with `john@example.com`

**Steps:**

1. Try to register with same email
2. Fill other fields

**Expected Result:**

- Error message: "Email already registered"
- Page doesn't redirect
- Registration not saved

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 5: Employee Login Before Approval

**Objective:** Verify unapproved employee cannot login

**Prerequisites:** Just registered employee

**Steps:**

1. Navigate to Employee Login
2. Enter credentials:
   - Email: `john@example.com`
   - Password: `test123`
3. Click "Login"

**Expected Result:**

- Error message: "Your account is pending admin approval..."
- Does not redirect to dashboard
- No token saved

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 6: Admin Approve Employee

**Objective:** Verify admin can approve registration

**Prerequisites:** Employee registered, admin logged in

**Steps:**

1. In Admin Dashboard, go to "Employee Registrations" tab
2. Find registered employee in "Pending Registrations"
3. Click "Approve" button
4. Check browser console (DevTools → Console)

**Expected Result:**

- Employee moves to "Approved Employees" section
- Success message displayed
- `approvedAt` date set
- Employee can now login

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 7: Admin Reject Employee

**Objective:** Verify admin can reject registration

**Prerequisites:** Employee registered, admin logged in

**Steps:**

1. In Admin Dashboard, go to "Employee Registrations" tab
2. Find registered employee
3. Click "Reject" button
4. Confirm action

**Expected Result:**

- Employee removed from list
- Can no longer exist in database
- Success message shown

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 8: Employee Login After Approval

**Objective:** Verify approved employee can login

**Prerequisites:** Employee approved by admin

**Steps:**

1. Navigate to Employee Login
2. Enter credentials
3. Click "Login"

**Expected Result:**

- Redirects to Employee Dashboard
- Shows employee profile with name, email, department
- Status shows "Approved"
- Token saved in localStorage

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 9: Assign Task to Employee

**Objective:** Verify admin can assign task

**Prerequisites:** Admin logged in, at least one approved employee

**Steps:**

1. Go to "Assign Task" tab
2. Fill form:
   - Title: `Complete Project Proposal`
   - Description: `Prepare and submit Q2 proposal`
   - Assign to: Select approved employee
   - Priority: `High`
   - Due Date: `2024-05-31`
3. Click "Assign Task"

**Expected Result:**

- Success message: "Task assigned successfully!"
- Form clears
- Task appears in "All Tasks" tab
- Task is in database with status "Pending"

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 10: View All Tasks (Admin)

**Objective:** Verify admin can see all tasks

**Prerequisites:** Admin logged in, tasks assigned

**Steps:**

1. Go to "All Tasks" tab
2. Observe task list
3. Check statistics: Total, Pending, In Progress, Completed

**Expected Result:**

- All assigned tasks visible
- Shows task details: title, employee, department, priority, due date
- Statistics count correct
- Delete button available for each task

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 11: Filter Tasks by Status

**Objective:** Verify tasks can be filtered

**Prerequisites:** Multiple tasks with different statuses

**Steps:**

1. In "All Tasks" tab, click "Pending" filter button
2. Observe list
3. Try other filters: "In Progress", "Completed"

**Expected Result:**

- Shows only tasks with clicked status
- Statistics update
- Can return to "All" view

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 12: Employee View Assigned Tasks

**Objective:** Verify employee sees only their tasks

**Prerequisites:** Employee logged in, tasks assigned

**Steps:**

1. In Employee Dashboard, go to assigned tasks section
2. Check tasks displayed

**Expected Result:**

- Shows only tasks assigned to this employee
- Displays task details: title, description, priority, due date, assigned by
- Statistics correct
- Status dropdown available for each task

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 13: Update Task Status

**Objective:** Verify employee can update task status

**Prerequisites:** Employee logged in, task assigned

**Steps:**

1. See task with "Pending" status
2. Click status dropdown
3. Select "In Progress"
4. Observe change

**Expected Result:**

- Status immediately updates to "In Progress"
- No page reload needed
- Status persists after refresh
- All fields show correct info

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 14: Complete Multiple Status Changes

**Objective:** Verify all status transitions work

**Prerequisites:** Task with Pending status

**Steps:**

1. Change: Pending → In Progress (check status)
2. Change: In Progress → Completed (check status)
3. Change: Completed → Pending (verify works)

**Expected Result:**

- All transitions work correctly
- Status persists
- Task appears in correct filter groups

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 15: Delete Task (Admin)

**Objective:** Verify admin can delete tasks

**Prerequisites:** Admin logged in, tasks exist

**Steps:**

1. Go to "All Tasks" tab
2. Click "Delete" button on a task
3. Check confirmation

**Expected Result:**

- Task removed from list
- Success message shown
- Task removed from database
- Cannot view task anywhere

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 16: Invalid Task Status

**Objective:** Verify invalid status is rejected

**Prerequisites:** Employee in dashboard

**Steps:**

1. Manually edit network request to send invalid status
2. Or check frontend prevents invalid selection

**Expected Result:**

- Frontend prevents invalid status selection in dropdown
- If somehow sent, backend returns 400 error: "Invalid status"
- Original status persists

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 17: Unauthorized Access Prevention

**Objective:** Verify employee cannot access admin routes

**Prerequisites:** Employee token in localStorage

**Steps:**

1. As employee, manually navigate to `/admin/dashboard`
2. Check if access denied

**Expected Result:**

- Redirects to home page
- Cannot access admin features
- Shows appropriate error

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 18: Token Expiry

**Objective:** Verify expired tokens are rejected

**Prerequisites:** Token in localStorage

**Steps:**

1. Wait 24 hours or manually modify token in localStorage
2. Try to make an authenticated request
3. Or manually expire token in browser

**Expected Result:**

- 401 Unauthorized response
- User redirected to login
- Token cleared
- Must login again

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 19: Missing Required Fields

**Objective:** Verify form validation

**Test for each form:**

- Employee Registration
- Employee Login
- Task Assignment

**Steps:**

1. Leave required field empty
2. Try to submit

**Expected Result:**

- Browser validation prevents submission
- Or error message shown
- Form doesn't submit

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Test Case 20: Invalid Email Format

**Objective:** Verify email validation

**Steps:**

1. Try to submit form with invalid email: `notanemail`
2. Try with valid format: `test@example.com`

**Expected Result:**

- Invalid emails rejected
- Valid emails accepted
- Appropriate feedback given

**Actual Result:**

- [ ] Pass / [ ] Fail

---

## Browser Console Testing

### Check for Errors

1. Open DevTools (F12)
2. Go to Console tab
3. Reload page
4. Look for red error messages

**Expected:**

- No console errors
- May have warnings (safe to ignore)

### Check Network Requests

1. Go to Network tab
2. Perform action (login, submit form)
3. Click request
4. Check:
   - Request headers (has Authorization if needed)
   - Response status (200, 201, 400, etc.)
   - Response body (check for errors)

---

## Database Testing

### Connect to MongoDB

1. Use MongoDB Compass
2. Connection: `mongodb://localhost:27017`
3. Check collections:
   - `admin` - should have 1 doc
   - `employee` - should have registrations
   - `task` - should have assignments

### Verify Data

```javascript
// In MongoDB Compass, run in console:
db.employee.find();
db.task.find();
db.admin.find();
```

---

## API Testing with cURL

### Test Admin Login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Test Get Employees (with token)

```bash
curl -X GET http://localhost:5000/api/admin/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Performance Testing

### Measure Response Times

1. Open DevTools → Network tab
2. Perform key actions
3. Check response times:
   - Login: < 200ms
   - Get tasks: < 300ms
   - Create task: < 200ms

### Load Testing

```bash
# Using Apache Bench
ab -n 100 -c 10 http://localhost:5000/api/health

# Using WRK
wrk -t12 -c400 -d30s http://localhost:5000/api/health
```

---

## Test Summary

| Test Case            | Status | Notes |
| -------------------- | ------ | ----- |
| 1. Admin Login       |        |       |
| 2. Admin Logout      |        |       |
| 3. Employee Register |        |       |
| ...                  |        |       |

---

## Issues Found

If any test fails:

1. **Document Issue:**
   - Test case number
   - Expected vs actual
   - Steps to reproduce
   - Browser console errors

2. **Create Issue:**
   - Use ISSUES.md template
   - Include test case number
   - Attach screenshots if needed

3. **Fix:**
   - Check backend logs
   - Check frontend console
   - Check database
   - Review code changes

---

## Regression Testing

Before each release, run all test cases to ensure no regressions.

---

Last Updated: 2024-04-06
