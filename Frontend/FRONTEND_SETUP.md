# Frontend Setup & Usage Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 8080

### Installation

1. **Navigate to Frontend**
```bash
cd Frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📱 Available Routes

### Public Routes
- `/` - Home page
- `/services` - Services listing
- `/work` - Portfolio/Work showcase
- `/contact` - Contact page
- `/resume` - Resume page
- `/courses` - Courses page

### Authentication Routes
- `/login` - User login page
- `/register` - User registration page
- `/admin-login` - Admin login page

### Protected Routes
- `/user-dashboard` - User dashboard (requires user login)
- `/admin-dashboard` - Admin dashboard (requires admin login)

## 🔐 Test Credentials

### Admin Login (Predefined)
```
Email: admin@example.com
Password: admin123
Role: Superadmin
```

### Alternative Admin Account
```
Email: moderator@example.com
Password: moderator123
Role: Admin
```

### Create User Account
- Register a new account at `/register`
- Or login with existing account at `/login`

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── services/
│   │   └── apiService.js              # API integration (Fetch API)
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ServicePage.jsx
│   │   ├── WorkPAge.jsx
│   │   ├── Contact.jsx
│   │   ├── ResumePage.jsx
│   │   ├── CoursePage.jsx
│   │   ├── UserLogin.jsx              # 🆕 Integrated with API
│   │   ├── UserRegister.jsx           # 🆕 Integrated with API
│   │   ├── AdminLogin.jsx             # 🆕 Integrated with API
│   │   ├── UserDashboard.jsx          # 🆕 NEW Dashboard
│   │   └── AdminDashboard.jsx         # 🆕 NEW Dashboard
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navigation.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Link.jsx
│   │   ├── home/
│   │   ├── Contact/
│   │   ├── courses/
│   │   ├── resume/
│   │   ├── services/
│   │   ├── work/
│   │   └── utils/
│   │
│   ├── App.jsx                        # 🆕 Updated with new routes
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
├── DASHBOARD_DOCUMENTATION.md         # 🆕 Full documentation
└── README.md
```

## 🎯 User Dashboard Features

### Overview
- User profile display
- Quick statistics (account status, member since, last updated)
- Responsive sidebar navigation

### Functionalities
1. **View Profile**
   - Display user name, email, phone
   - Show account creation date

2. **Edit Profile**
   - Update name and phone number
   - Email is read-only
   - Real-time API update

3. **Logout**
   - Clear authentication tokens
   - Redirect to home page

### Access
```
URL: http://localhost:5173/#/user-dashboard
Requires: User authentication token
```

## 🛡️ Admin Dashboard Features

### Dashboard Tabs

#### 1. Overview
- Statistics cards (users, contacts, courses)
- Contact status breakdown
- Progress indicators

#### 2. Contacts Management
- View all contact messages
- Change message status (new → read → responded)
- Delete messages
- Display contact details (name, email, phone, date)

#### 3. Courses Management
- View all courses in grid layout
- Display course details (title, description, category, level, price)
- Edit button placeholder

#### 4. Users Management
- User management (coming soon)

#### 5. Settings
- Display admin information
- Additional settings (coming soon)

### Access
```
URL: http://localhost:5173/#/admin-dashboard
Requires: Admin authentication token
Credentials: admin@example.com / admin123
```

## 🔌 API Service Usage

### Import API Service
```javascript
import { userAPI, adminAPI, contactAPI, courseAPI, tokenStorage } from '../services/apiService';
```

### User API Examples
```javascript
// Register new user
const response = await userAPI.register({
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  password: "password123"
});

// Login user
const response = await userAPI.login({
  email: "john@example.com",
  password: "password123"
});

// Get user profile
const token = tokenStorage.getUserToken();
const response = await userAPI.getProfile(token);

// Update profile
const response = await userAPI.updateProfile({
  name: "Updated Name",
  phone: "9876543210"
}, token);
```

### Admin API Examples
```javascript
// Admin login
const response = await adminAPI.login({
  email: "admin@example.com",
  password: "admin123"
});

// Get admin dashboard
const response = await adminAPI.getDashboard(token);
```

### Contact API Examples
```javascript
// Send contact message
const response = await contactAPI.send({
  name: "John",
  email: "john@example.com",
  phone: "1234567890",
  subject: "Inquiry",
  message: "Your message here"
});

// Get all contacts (admin only)
const contacts = await contactAPI.getAll(token);

// Update contact status
await contactAPI.updateStatus(contactId, 'responded', token);

// Delete contact
await contactAPI.delete(contactId, token);

// Get statistics
const stats = await contactAPI.getStats(token);
```

## 💾 Local Storage

The app automatically manages authentication tokens:

```javascript
import { tokenStorage } from '../services/apiService';

// Save tokens after login
tokenStorage.setUserToken(token);
tokenStorage.setUserData(userData);

// Retrieve tokens
const token = tokenStorage.getUserToken();
const user = tokenStorage.getUserData();

// Clear on logout
tokenStorage.removeUserToken();
tokenStorage.removeUserData();
```

## 🧪 Testing Workflow

### 1. User Registration Flow
```
1. Go to http://localhost:5173/#/register
2. Fill in: name, email, phone, password, confirm password
3. Click "Create Account"
4. Should redirect to User Dashboard
5. Profile data displays
```

### 2. User Login Flow
```
1. Go to http://localhost:5173/#/login
2. Enter email and password
3. Click "Sign In"
4. Should redirect to User Dashboard
5. Can edit profile and logout
```

### 3. Admin Login Flow
```
1. Go to http://localhost:5173/#/admin-login
2. Use: admin@example.com / admin123
3. Click "Admin Sign In"
4. Should redirect to Admin Dashboard
5. Can view contacts, courses, statistics
```

### 4. Admin Dashboard Testing
```
1. Login as admin
2. Navigate through tabs:
   - Overview: Check statistics
   - Contacts: Manage messages, change status
   - Courses: View course list
   - Users: See placeholder
   - Settings: View admin info
3. Logout: Click logout button
```

## 🛠️ Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint (code quality)
npm run lint
```

## 🎨 Customization

### API Base URL
Edit `src/services/apiService.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Styling
- Uses Tailwind CSS for utility classes
- Lucide React for icons
- Modify colors in component className attributes

### Add New API Calls
```javascript
// In src/services/apiService.js
export const newAPI = {
  endpoint: (data, token) => 
    apiCall('/new-endpoint', 'POST', data, token),
};

// Then use in components:
import { newAPI } from '../services/apiService';
await newAPI.endpoint(data, token);
```

## ⚠️ Common Issues & Solutions

### Issue: "Cannot connect to backend"
**Solution:** 
- Ensure backend is running on port 8080
- Check API_BASE_URL in apiService.js
- Verify CORS is enabled on backend

### Issue: "Token expired/invalid"
**Solution:**
- Login again
- Clear localStorage: `localStorage.clear()`
- Ensure 7-day token validity

### Issue: "Dashboard not loading"
**Solution:**
- Check browser console for errors
- Verify token is stored in localStorage
- Check network requests in DevTools
- Ensure backend is responding

### Issue: "CORS error in console"
**Solution:**
- Verify backend CORS configuration
- Check if backend is running
- Restart both frontend and backend

## 📚 Key Technologies

- **React 19.1.1** - UI Framework
- **Vite 7.1.7** - Build Tool
- **Tailwind CSS 4.1.14** - Styling
- **Lucide React 0.546.0** - Icons
- **React Router DOM 7.9.4** - Routing
- **Custom Fetch API** - HTTP Client (No Axios!)

## 🚀 Deployment

### Build for Production
```bash
npm run build
# Creates optimized dist/ folder
```

### Deploy to Netlify/Vercel
1. Build the project
2. Deploy dist/ folder
3. Set environment variables if needed
4. Update API_BASE_URL for production backend

### Environment Configuration
Create `.env` file if needed:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 📝 Notes

- All API calls use Fetch API (no axios dependency)
- Tokens stored in localStorage (not secure in production - use httpOnly cookies)
- Dashboard auto-redirects if not authenticated
- Mobile responsive design
- Error handling on all API calls

---

**Happy Coding! 🎉**

For detailed API documentation, see `DASHBOARD_DOCUMENTATION.md`
