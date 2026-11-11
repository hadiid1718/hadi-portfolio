// API Service using Fetch API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://hadi-portfolio-r47a.onrender.com/api';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API Error');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Admin API endpoints
export const adminAPI = {
  login: (credentials) => 
    apiCall('/admin/login', 'POST', credentials),
  
  getDashboard: (token) => 
    apiCall('/admin/dashboard', 'GET', null, token),
  
  getAllAdmins: (token) => 
    apiCall('/admin/all', 'GET', null, token),
  
  createAdmin: (adminData, token) => 
    apiCall('/admin/create', 'POST', adminData, token),
};

// Contact API endpoints
export const contactAPI = {
  send: (contactData) => 
    apiCall('/contact/send', 'POST', contactData),
  
  getAll: (token) => 
    apiCall('/contact/all', 'GET', null, token),
  
  getById: (id, token) => 
    apiCall(`/contact/${id}`, 'GET', null, token),
  
  getDetails: (contactId, token) => 
    apiCall(`/contact/details/${contactId}`, 'GET', null, token),
  
  updateStatus: (id, status, token) => 
    apiCall(`/contact/${id}/status`, 'PUT', { status }, token),
  
  // replyData: { to, subject, message, adminName, adminEmail } - actually delivers an email to `to`
  sendReply: (id, replyData, token) => 
    apiCall(`/contact/${id}/reply`, 'PUT', replyData, token),
  
  delete: (id, token) => 
    apiCall(`/contact/${id}`, 'DELETE', null, token),
  
  getStats: (token) => 
    apiCall('/contact/stats/all', 'GET', null, token),
  
  getUserConversation: (userEmail) => 
    apiCall(`/contact/user/${userEmail}`, 'GET'),
};

// Course API endpoints
export const courseAPI = {
  getAll: () => 
    apiCall('/courses/all', 'GET'),
  
  getById: (id) => 
    apiCall(`/courses/${id}`, 'GET'),
  
  getByCategory: (category) => 
    apiCall(`/courses/category/${category}`, 'GET'),
  
  create: (courseData, token) => 
    apiCall('/courses/create', 'POST', courseData, token),
  
  update: (id, courseData, token) => 
    apiCall(`/courses/${id}`, 'PUT', courseData, token),
  
  delete: (id, token) => 
    apiCall(`/courses/${id}`, 'DELETE', null, token),
  
  getStats: (token) => 
    apiCall('/courses/stats/all', 'GET', null, token),
};

// Work API endpoints
export const workAPI = {
  getAll: () => 
    apiCall('/works', 'GET'),
  
  getById: (id) => 
    apiCall(`/works/${id}`, 'GET'),
  
  getFeatured: () => 
    apiCall('/works/featured', 'GET'),
  
  getByCategory: (category) => 
    apiCall(`/works/category/${category}`, 'GET'),
  
  getStats: () => 
    apiCall('/works/stats', 'GET'),
  
  create: (workData, token) => 
    apiCall('/works', 'POST', workData, token),
  
  update: (id, workData, token) => 
    apiCall(`/works/${id}`, 'PUT', workData, token),
  
  delete: (id, token) => 
    apiCall(`/works/${id}`, 'DELETE', null, token),
};

// Service API endpoints
export const serviceAPI = {
  getAll: () => 
    apiCall('/services', 'GET'),
  
  getById: (id) => 
    apiCall(`/services/${id}`, 'GET'),
  
  getStats: () => 
    apiCall('/services/stats', 'GET'),
  
  create: (serviceData, token) => 
    apiCall('/services', 'POST', serviceData, token),
  
  update: (id, serviceData, token) => 
    apiCall(`/services/${id}`, 'PUT', serviceData, token),
  
  delete: (id, token) => 
    apiCall(`/services/${id}`, 'DELETE', null, token),
};

// Chatbot API endpoints
export const chatbotAPI = {
  // history: [{ role: 'user' | 'bot', text }]
  chat: (message, history = []) =>
    apiCall('/chatbot/chat', 'POST', { message, history }),
};

// Local storage utilities
export const tokenStorage = {
  setAdminToken: (token) => localStorage.setItem('adminToken', token),
  getAdminToken: () => localStorage.getItem('adminToken'),
  removeAdminToken: () => localStorage.removeItem('adminToken'),
  
  setAdminData: (data) => localStorage.setItem('adminData', JSON.stringify(data)),
  getAdminData: () => {
    const data = localStorage.getItem('adminData');
    return data ? JSON.parse(data) : null;
  },
  removeAdminData: () => localStorage.removeItem('adminData'),
};

export default {
  adminAPI,
  contactAPI,
  courseAPI,
  workAPI,
  serviceAPI,
  chatbotAPI,
  tokenStorage,
};