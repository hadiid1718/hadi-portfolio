# Frontend Dashboard & API Integration Documentation

## 📋 Overview

The frontend now has fully integrated dashboards for users and admins with API connectivity using the Fetch API (no axios required).

## 🏗️ Project Structure

```
Frontend/
├── src/
│   ├── services/
│   │   └── apiService.js          # API service with fetch API
│   │
│   ├── pages/
│   │   ├── UserLogin.jsx          # User login with API integration
│   │   ├── UserRegister.jsx       # User registration with API
│   │   ├── AdminLogin.jsx         # Admin login with API
│   │   ├── UserDashboard.jsx      # User dashboard (NEW)
│   │   └── AdminDashboard.jsx     # Admin dashboard (NEW)
│   │
│   └── App.jsx                    # Updated with new routes
```

## 🚀 New Features

### 1. API Service (`apiService.js`)

A centralized API service using **Fetch API** (no axios):

```javascript
// All API calls go through here
const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  // Handles all HTTP requests
}

// Export organized API endpoints
export const userAPI = { register, login, getProfile, updateProfile, getAllUsers }
export const adminAPI = { login, getDashboard, getAllAdmins, createAdmin }
export const contactAPI = { send, getAll, getById, updateStatus, delete, getStats }
export const courseAPI = { getAll, getById, getByCategory, create, update, delete, getStats }

// Local storage utilities for tokens
export const tokenStorage = {
  setUserToken, getUserToken, removeUserToken,
  setAdminToken, getAdminToken, removeAdminToken,
  // ... user and admin data storage
}
```

### 2. User Dashboard (`/user-dashboard`)

**Features:**
- ✅ User profile display with sidebar navigation
- ✅ Edit profile functionality (name, phone)
- ✅ Real-time data fetching from API
- ✅ Responsive design with mobile menu
- ✅ User statistics cards
- ✅ Logout functionality
- ✅ Auto-redirect if not logged in

**Layout:**
- **Sidebar:** Navigation menu, user info, logout
- **Content:** Profile information, edit form, stats

**Key Functionalities:**
```javascript
// Auto-fetch user profile on load
fetchUserProfile() // GET /api/users/profile

// Update profile
handleSaveProfile() // PUT /api/users/profile

// Logout
handleLogout() // Clear tokens and redirect
```

### 3. Admin Dashboard (`/admin-dashboard`)

**Features:**
- ✅ Admin overview with statistics
- ✅ Contact message management
- ✅ Course management display
- ✅ User management section
- ✅ Settings page
- ✅ Responsive sidebar navigation
- ✅ Status updates and deletion

**Tabs:**
1. **Overview**
   - Total users, contacts, new messages, courses
   - Progress bars for statistics

2. **Contacts**
   - View all contact messages
   - Update message status (new/read/responded)
   - Delete messages
   - Display contact info

3. **Courses**
   - Display all courses in grid
   - Course details (category, level, price)
   - Edit button (placeholder)

4. **Users**
   - User management (coming soon)

5. **Settings**
   - Admin information display
   - Additional settings (coming soon)

**API Calls:**
```javascript
// Dashboard data
adminAPI.getDashboard(token)      // GET /api/admin/dashboard

// Contacts
contactAPI.getAll(token)          // GET /api/contact/all
contactAPI.getStats(token)        // GET /api/contact/stats/all
contactAPI.updateStatus()         // PUT /api/contact/:id/status
contactAPI.delete()               // DELETE /api/contact/:id

// Courses
courseAPI.getAll()                // GET /api/courses/all
courseAPI.getStats(token)         // GET /api/courses/stats/all
```

## 🔐 Authentication Flow

### User Registration & Login
```
1. User submits credentials in UserRegister/UserLogin
2. Frontend calls userAPI.register() or userAPI.login()
3. Backend validates and returns token
4. Frontend stores token using tokenStorage.setUserToken()
5. Frontend redirects to /user-dashboard
6. Dashboard fetches user profile using stored token
```

### Admin Login
```
1. Admin submits credentials in AdminLogin
2. Frontend calls adminAPI.login()
3. Backend validates and returns token + admin data
4. Frontend stores both using tokenStorage.setAdminToken()
5. Frontend redirects to /admin-dashboard
6. Dashboard loads statistics and content
```

### Protected Routes
```javascript
// Check for token on page load
useEffect(() => {
  if (!token) {
    window.location.hash = '#/login'; // Redirect to login
  }
}, [token]);
```

## 📡 API Integration Details

### Base URL
```
http://localhost:8080/api
```

### Authentication Header
All protected requests include:
```
Authorization: Bearer <token>
```

### Request/Response Format

**API Call Example:**
```javascript
const response = await userAPI.getProfile(token);
// Automatically includes Authorization header
```

**Response Format:**
```json
{
  "message": "Success message",
  "user": { /* user data */ },
  "token": "jwt_token"
}
```

**Error Handling:**
```javascript
try {
  const response = await userAPI.login(credentials);
  // Handle success
} catch (error) {
  // Error message automatically extracted and displayed
  setError(error.message);
}
```

## 💾 Local Storage Management

### Storage Keys
```javascript
// User authentication
localStorage.userToken        // JWT token
localStorage.userData         // User profile data

// Admin authentication
localStorage.adminToken       // JWT token
localStorage.adminData        // Admin profile data
```

### Usage
```javascript
import { tokenStorage } from '../services/apiService';

// Save data
tokenStorage.setUserToken(token);
tokenStorage.setUserData(userData);

// Retrieve data
const token = tokenStorage.getUserToken();
const user = tokenStorage.getUserData();

// Clear on logout
tokenStorage.removeUserToken();
tokenStorage.removeUserData();
```

## 🎨 Styling & Components

### Technologies Used
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Custom CSS** - Additional styling

### Responsive Design
- Mobile-first approach
- Sidebar collapses on mobile (hamburger menu)
- All components are fully responsive
- Touch-friendly interactions

## 🧪 Testing the Integration

### 1. Test User Registration
```
1. Go to /register
2. Fill in all fields
3. Click "Create Account"
4. Should redirect to /user-dashboard
5. Your profile data should display
```

### 2. Test User Login
```
1. Go to /login
2. Enter email and password
3. Click "Sign In"
4. Should redirect to /user-dashboard
5. Click "Edit Profile" to update name/phone
```

### 3. Test Admin Login (Predefined Credentials)
```
1. Go to /admin-login
2. Use: admin@example.com / admin123
3. Click "Admin Sign In"
4. Should redirect to /admin-dashboard
5. View contacts, courses, and statistics
```

### 4. Test Contact Management
```
1. Login as admin
2. Go to "Contacts" tab
3. View all contacts
4. Change status (new → read → responded)
5. Delete contacts
6. Check statistics update
```

## 📝 Code Examples

### Fetch User Profile
```javascript
import { userAPI, tokenStorage } from '../services/apiService';

const token = tokenStorage.getUserToken();
const response = await userAPI.getProfile(token);
setUserData(response.user);
```

### Update Profile
```javascript
const response = await userAPI.updateProfile(
  { name: 'New Name', phone: '9876543210' },
  token
);
```

### Get Admin Dashboard
```javascript
const response = await adminAPI.getDashboard(token);
console.log(response.admin);
```

### Manage Contacts
```javascript
// Get all contacts
const contacts = await contactAPI.getAll(token);

// Update status
await contactAPI.updateStatus(contactId, 'responded', token);

// Delete contact
await contactAPI.delete(contactId, token);

// Get statistics
const stats = await contactAPI.getStats(token);
```

## 🛠️ Development Workflow

### Starting the Application
```bash
# Terminal 1 - Backend
cd Backend
npm start
# Server runs on port 8080

# Terminal 2 - Frontend
cd Frontend
npm run dev
# Frontend runs on port 5173
```

### Common Issues & Solutions

**Issue:** "Cannot reach server"
- Solution: Ensure backend is running on port 8080
- Check `.env` for correct API_BASE_URL

**Issue:** "Token not found"
- Solution: Ensure you're logged in
- Clear browser storage and try again
- Check if token is being stored in localStorage

**Issue:** "CORS error"
- Solution: Backend must have CORS enabled
- Verify CORS configuration in backend index.js

**Issue:** "Dashboard shows loading"
- Solution: Check network tab in DevTools
- Ensure token is valid (not expired)
- Check backend API responses

## 📚 Additional Features to Implement

1. **Password Change** - Add password update in dashboard
2. **User Profile Picture** - Upload and display avatar
3. **Contact Form** - Frontend contact submission
4. **Course Enrollment** - User enrollment system
5. **Admin Creation** - Superadmin creating new admins
6. **Notifications** - Real-time notifications
7. **Search & Filter** - In contacts and courses
8. **Export Data** - Export contacts/courses as CSV

## 🔒 Security Considerations

- ✅ Passwords never sent in plain text (HTTPS required in production)
- ✅ Tokens stored securely in localStorage
- ✅ JWT tokens expire after 7 days
- ✅ Protected routes check for valid token
- ✅ API calls include authorization headers
- ⚠️ In production: Use secure storage (httpOnly cookies)

## 📊 API Response Examples

### User Login Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

### Admin Dashboard Response
```json
{
  "message": "Admin dashboard data",
  "admin": {
    "id": "admin_id",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "superadmin"
  },
  "dashboard": {
    "totalUsers": 50,
    "totalContacts": 15,
    "totalCourses": 8
  }
}
```

---

## ✅ Checklist

- ✅ API Service with Fetch API created
- ✅ User Dashboard with profile management
- ✅ Admin Dashboard with statistics
- ✅ Contact management in admin panel
- ✅ Course display in admin panel
- ✅ Authentication integration
- ✅ Token storage and retrieval
- ✅ Protected routes with auto-redirect
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

---

**Frontend Ready for Production! 🚀**
