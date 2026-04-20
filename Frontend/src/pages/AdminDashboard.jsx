import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, Settings, BarChart3, Users, Mail, BookOpen, LogIn, LogOut as LogOutIcon, Briefcase, Plus, Trash2, Edit2, Zap } from 'lucide-react';
import { adminAPI, contactAPI, courseAPI, workAPI, serviceAPI, tokenStorage } from '../services/apiService';

export const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [adminData, setAdminData] = useState(tokenStorage.getAdminData());
  const [contacts, setContacts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContacts: 0,
    totalCourses: 0
  });
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);
  const [works, setWorks] = useState([]);
  const [showAddWorkForm, setShowAddWorkForm] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [workFormData, setWorkFormData] = useState({
    title: '',
    description: '',
    category: 'Full Stack',
    technologies: '',
    metrics: '',
    status: 'Complete',
    value: '',
    hostedUrl: '',
    hosted: 'No',
    gradient: 'from-blue-500 to-purple-600',
    featured: false
  });
  const [workLoading, setWorkLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    description: '',
    features: '',
    technologies: '',
    icon: '',
    order: 0
  });
  const [serviceLoading, setServiceLoading] = useState(false);
  const token = tokenStorage.getAdminToken();

  // Update date/time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!token) {
      window.location.hash = '#/admin-login';
      return;
    }
    loadDashboardData();
  }, [token]);

  useEffect(() => {
    if (activeTab === 'contacts') {
      loadContacts();
    } else if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'works') {
      loadWorks();
    } else if (activeTab === 'services') {
      loadServices();
    }
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get admin dashboard with stats
      const dashboardRes = await adminAPI.getDashboard(token);
      
      if (dashboardRes.dashboard?.admin) {
        setAdminData(dashboardRes.dashboard.admin);
        tokenStorage.setAdminData(dashboardRes.dashboard.admin);
      }

      if (dashboardRes.dashboard?.stats) {
        setStats(dashboardRes.dashboard.stats);
      }
      
      // Get courses
      const coursesRes = await courseAPI.getAll();
      setCourses(coursesRes.courses || []);
    } catch (error) {
      console.error('[loadDashboardData] Error:', error);
      // Use stored admin data as fallback
      const storedAdminData = tokenStorage.getAdminData();
      if (storedAdminData) {
        setAdminData(storedAdminData);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadContacts = async () => {
    try {
      setLoading(true);
      console.log('[loadContacts] Token:', token);
      const contactsRes = await contactAPI.getAll(token);
      console.log('[loadContacts] Response:', contactsRes);
      setContacts(contactsRes.contacts || []);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersRes = await adminAPI.getAllUsers(token);
      setUsers(usersRes.users || []);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWorks = async () => {
    try {
      setWorkLoading(true);
      const worksRes = await workAPI.getAll();
      setWorks(worksRes.works || []);
    } catch (error) {
      console.error('Error loading works:', error);
      setWorks([]);
    } finally {
      setWorkLoading(false);
    }
  };

  const handleWorkFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddWork = async (e) => {
    e.preventDefault();
    try {
      setWorkLoading(true);
      
      const workData = {
        ...workFormData,
        technologies: workFormData.technologies.split(',').map(t => t.trim()).filter(t => t),
        metrics: workFormData.metrics.split(',').map(m => m.trim()).filter(m => m)
      };

      if (editingWork) {
        await workAPI.update(editingWork._id, workData, token);
        alert('Work updated successfully!');
      } else {
        await workAPI.create(workData, token);
        alert('Work added successfully!');
      }

      setWorkFormData({
        title: '',
        description: '',
        category: 'Full Stack',
        technologies: '',
        metrics: '',
        status: 'Complete',
        value: '',
        hostedUrl: '',
        hosted: 'No',
        gradient: 'from-blue-500 to-purple-600',
        featured: false
      });
      setEditingWork(null);
      setShowAddWorkForm(false);
      loadWorks();
    } catch (error) {
      console.error('Error adding work:', error);
      alert('Error adding work. Please try again.');
    } finally {
      setWorkLoading(false);
    }
  };

  const handleEditWork = (work) => {
    setEditingWork(work);
    setWorkFormData({
      title: work.title,
      description: work.description,
      category: work.category,
      technologies: work.technologies.join(', '),
      metrics: work.metrics.join(', '),
      status: work.status,
      value: work.value || '',
      hostedUrl: work.hostedUrl || '',
      hosted: work.hosted,
      gradient: work.gradient,
      featured: work.featured
    });
    setShowAddWorkForm(true);
  };

  const handleDeleteWork = async (workId) => {
    if (window.confirm('Are you sure you want to delete this work?')) {
      try {
        setWorkLoading(true);
        await workAPI.delete(workId, token);
        alert('Work deleted successfully!');
        loadWorks();
      } catch (error) {
        console.error('Error deleting work:', error);
        alert('Error deleting work. Please try again.');
      } finally {
        setWorkLoading(false);
      }
    }
  };

  const handleLogout = () => {
    tokenStorage.removeAdminToken();
    tokenStorage.removeAdminData();
    window.location.hash = '#/';
  };

  const handleContactStatusChange = async (contactId, newStatus) => {
    try {
      await contactAPI.updateStatus(contactId, newStatus, token);
      setContacts(contacts.map(c => 
        c._id === contactId ? { ...c, status: newStatus } : c
      ));
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await contactAPI.delete(contactId, token);
      setContacts(contacts.filter(c => c._id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSendReply = async (contactId) => {
    if (!replyMessage.trim() || !adminData) return;

    try {
      setReplyLoading(true);
      const replyData = {
        message: replyMessage,
        adminName: adminData.name,
        adminEmail: adminData.email,
      };
      
      await contactAPI.sendReply(contactId, replyData, token);
      
      // Update the selected contact with the new reply
      const updatedContact = await contactAPI.getDetails(contactId, token);
      setSelectedContact(updatedContact.contact);
      
      // Also update the contacts list
      setContacts(contacts.map(c => 
        c._id === contactId ? updatedContact.contact : c
      ));
      
      setReplyMessage('');
      
      // Show success message
      alert('Reply sent successfully!');
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Error sending reply. Please try again.');
    } finally {
      setReplyLoading(false);
    }
  };

  const loadServices = async () => {
    try {
      setServiceLoading(true);
      const servicesRes = await serviceAPI.getAll();
      setServices(servicesRes.services || []);
    } catch (error) {
      console.error('Error loading services:', error);
      setServices([]);
    } finally {
      setServiceLoading(false);
    }
  };

  const handleServiceFormChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      setServiceLoading(true);
      
      const serviceData = {
        ...serviceFormData,
        features: serviceFormData.features.split('\n').map(f => f.trim()).filter(f => f),
        technologies: serviceFormData.technologies.split(',').map(t => t.trim()).filter(t => t),
        order: parseInt(serviceFormData.order)
      };

      if (editingService) {
        await serviceAPI.update(editingService._id, serviceData, token);
        alert('Service updated successfully!');
      } else {
        await serviceAPI.create(serviceData, token);
        alert('Service added successfully!');
      }

      setServiceFormData({
        title: '',
        description: '',
        features: '',
        technologies: '',
        icon: '',
        order: 0
      });
      setEditingService(null);
      setShowAddServiceForm(false);
      loadServices();
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Error adding service. Please try again.');
    } finally {
      setServiceLoading(false);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceFormData({
      title: service.title,
      description: service.description,
      features: service.features.join('\n'),
      technologies: service.technologies.join(', '),
      icon: service.icon || '',
      order: service.order
    });
    setShowAddServiceForm(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        setServiceLoading(true);
        await serviceAPI.delete(serviceId, token);
        alert('Service deleted successfully!');
        loadServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Error deleting service. Please try again.');
      } finally {
        setServiceLoading(false);
      }
    }
  };

  const dashboardMenuItems = [
    { icon: BarChart3, label: 'Overview', id: 'overview' },
    { icon: Mail, label: 'Contacts', id: 'contacts' },
    { icon: Briefcase, label: 'Works', id: 'works' },
    { icon: Zap, label: 'Services', id: 'services' },
    { icon: BookOpen, label: 'Courses', id: 'courses' },
    { icon: Users, label: 'Users', id: 'users' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 flex">
      {/* Sidebar */}
      <div className={`fixed lg:relative top-20 lg:top-0 w-64 h-[calc(100vh-5rem)] lg:h-full bg-slate-900/50 border-r border-slate-800 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } z-40`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-8">Admin Panel</h2>
          
          {/* Admin Info Card */}
          <div className="bg-slate-800/50 rounded-lg p-4 mb-8 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <LogIn size={24} className="text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">Admin</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded">
                {adminData?.role?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {dashboardMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-red-400'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-6"
          >
            <LogOutIcon size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-24 left-4 z-50 p-2 bg-slate-800 rounded-lg text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-slate-400">Manage your portfolio and content</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-right">
                <p className="text-sm text-slate-400">Current Date & Time</p>
                <p className="text-xl font-bold text-red-400">{currentDateTime.toLocaleDateString()}</p>
                <p className="text-lg text-red-300">{currentDateTime.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-400 text-sm">Total Users</p>
                    <Users size={24} className="text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">-</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-400 text-sm">Total Contacts</p>
                    <Mail size={24} className="text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.totalContacts}</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-400 text-sm">New Messages</p>
                    <Mail size={24} className="text-orange-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.newContacts}</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-400 text-sm">Total Courses</p>
                    <BookOpen size={24} className="text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.totalCourses}</p>
                </div>
              </div>

              {/* Quick Stats Chart */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Dashboard Summary</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400">Contacts Status</span>
                      <span className="text-white font-semibold">{stats.totalContacts}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400">Courses</span>
                      <span className="text-white font-semibold">{stats.totalCourses}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
                {!selectedContact && (
                  <button
                    onClick={loadContacts}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded transition-all font-semibold"
                  >
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </button>
                )}
              </div>
              
              {selectedContact ? (
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Message Details</h3>
                    <button
                      onClick={() => {
                        setSelectedContact(null);
                        setReplyMessage('');
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-all"
                    >
                      Back
                    </button>
                  </div>

                  {/* Original Message */}
                  <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{selectedContact.name}</h4>
                        <p className="text-slate-400 text-sm">{selectedContact.email}</p>
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(selectedContact.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-slate-300 font-semibold mb-2 ">{selectedContact.subject}</p>
                    <p className="text-slate-200">{selectedContact.message}</p>
                  </div>

                  {/* Admin Replies */}
                  {selectedContact.replies && selectedContact.replies.length > 0 && (
                    <div className="mb-6 space-y-4">
                      <h4 className="text-white font-semibold">Replies:</h4>
                      {selectedContact.replies.map((reply, index) => (
                        <div key={index} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-green-400 font-semibold">{reply.adminName}</p>
                              <p className="text-slate-400 text-sm">{reply.adminEmail}</p>
                            </div>
                            <span className="text-xs text-slate-500">
                              {new Date(reply.sentAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-slate-200">{reply.message}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <label className="block text-white font-semibold mb-3">Send Reply</label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply message..."
                      rows="4"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 mb-3"
                    />
                    <button
                      onClick={() => handleSendReply(selectedContact._id)}
                      disabled={replyLoading || !replyMessage.trim()}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded transition-all font-semibold"
                    >
                      {replyLoading ? 'Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-slate-400">Loading contacts...</p>
                    </div>
                  ) : contacts.length > 0 ? (
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <div key={contact._id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-all cursor-pointer"
                          onClick={() => setSelectedContact(contact)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                              <p className="text-slate-400 text-sm">{contact.subject}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                contact.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                                contact.status === 'read' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {contact.status.toUpperCase()}
                              </span>
                              {contact.replies && contact.replies.length > 0 && (
                                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                                  {contact.replies.length} replies
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-slate-300 mb-4 line-clamp-2">{contact.message}</p>

                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="text-sm text-slate-400">
                              <p>Email: {contact.email}</p>
                              <p>Phone: {contact.phone}</p>
                            </div>
                            <p className="text-xs text-slate-500">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-400">No contacts found</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Courses</h2>
              
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-slate-400">Loading courses...</p>
                </div>
              ) : courses.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course._id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{course.description.substring(0, 100)}...</p>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <p><span className="text-slate-400">Category:</span> <span className="text-white">{course.category}</span></p>
                        <p><span className="text-slate-400">Instructor:</span> <span className="text-white">{course.instructor}</span></p>
                        <p><span className="text-slate-400">Level:</span> <span className="text-blue-400 capitalize">{course.level}</span></p>
                        <p><span className="text-slate-400">Price:</span> <span className="text-white">${course.price}</span></p>
                      </div>

                      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all">
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">No courses found</p>
                </div>
              )}
            </div>
          )}

          {/* Works Tab */}
          {activeTab === 'works' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Works & Projects</h2>
                <button
                  onClick={() => {
                    setShowAddWorkForm(!showAddWorkForm);
                    setEditingWork(null);
                    setWorkFormData({
                      title: '',
                      description: '',
                      category: 'Full Stack',
                      technologies: '',
                      metrics: '',
                      status: 'Complete',
                      value: '',
                      hostedUrl: '',
                      hosted: 'No',
                      gradient: 'from-blue-500 to-purple-600',
                      featured: false
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
                >
                  <Plus size={20} />
                  {showAddWorkForm ? 'Cancel' : 'Add Work'}
                </button>
              </div>

              {showAddWorkForm && (
                <form onSubmit={handleAddWork} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={workFormData.title}
                        onChange={handleWorkFormChange}
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Category *</label>
                      <select
                        name="category"
                        value={workFormData.category}
                        onChange={handleWorkFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option>Mern Stack</option>
                        <option>Frontend</option>
                        <option>Backend</option>
                        <option>Full Stack</option>
                        <option>Mobile</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 font-semibold">Description *</label>
                    <textarea
                      name="description"
                      value={workFormData.description}
                      onChange={handleWorkFormChange}
                      required
                      rows="4"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
                      placeholder="Project description"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        name="technologies"
                        value={workFormData.technologies}
                        onChange={handleWorkFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Metrics (comma-separated)</label>
                      <input
                        type="text"
                        name="metrics"
                        value={workFormData.metrics}
                        onChange={handleWorkFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="500K+ users, 99.9% uptime"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Status</label>
                      <select
                        name="status"
                        value={workFormData.status}
                        onChange={handleWorkFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option>Complete</option>
                        <option>Working</option>
                        <option>Planning</option>
                        <option>On Hold</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">GitHub URL</label>
                      <input
                        type="url"
                        name="value"
                        value={workFormData.value}
                        onChange={handleWorkFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Hosted URL</label>
                      <input
                        type="url"
                        name="hostedUrl"
                        value={workFormData.hostedUrl}
                        onChange={handleWorkFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="https://project.netlify.app"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Hosted?</label>
                      <select
                        name="hosted"
                        value={workFormData.hosted}
                        onChange={handleWorkFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Gradient</label>
                      <input
                        type="text"
                        name="gradient"
                        value={workFormData.gradient}
                        onChange={handleWorkFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="from-blue-500 to-purple-600"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={workFormData.featured}
                          onChange={handleWorkFormChange}
                          className="w-4 h-4"
                        />
                        <span className="text-slate-300">Featured Project</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={workLoading}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white rounded transition-all font-semibold"
                    >
                      {workLoading ? 'Saving...' : editingWork ? 'Update Work' : 'Add Work'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddWorkForm(false);
                        setEditingWork(null);
                      }}
                      className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {workLoading && !showAddWorkForm ? (
                <div className="text-center py-12">
                  <p className="text-slate-400">Loading works...</p>
                </div>
              ) : works.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {works.map((work) => (
                    <div key={work._id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-blue-500/50 transition">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">{work.title}</h3>
                          <p className="text-sm text-slate-400">{work.category}</p>
                        </div>
                        {work.featured && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Featured</span>
                        )}
                      </div>

                      <p className="text-slate-300 text-sm mb-3 line-clamp-2">{work.description}</p>

                      <div className="mb-3 flex flex-wrap gap-1">
                        {work.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                        {work.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                            +{work.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditWork(work)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-all"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteWork(work._id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-all"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">No works found. Click "Add Work" to create one.</p>
                </div>
              )}
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Services</h2>
                <button
                  onClick={() => {
                    setShowAddServiceForm(!showAddServiceForm);
                    setEditingService(null);
                    setServiceFormData({
                      title: '',
                      description: '',
                      features: '',
                      technologies: '',
                      icon: '',
                      order: 0
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
                >
                  <Plus size={20} />
                  {showAddServiceForm ? 'Cancel' : 'Add Service'}
                </button>
              </div>

              {showAddServiceForm && (
                <form onSubmit={handleAddService} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={serviceFormData.title}
                        onChange={handleServiceFormChange}
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Service title"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Order</label>
                      <input
                        type="number"
                        name="order"
                        value={serviceFormData.order}
                        onChange={handleServiceFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Display order"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 font-semibold">Description *</label>
                    <textarea
                      name="description"
                      value={serviceFormData.description}
                      onChange={handleServiceFormChange}
                      required
                      rows="3"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
                      placeholder="Service description"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 font-semibold">Features (one per line)</label>
                    <textarea
                      name="features"
                      value={serviceFormData.features}
                      onChange={handleServiceFormChange}
                      rows="4"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
                      placeholder="RESTful APIs&#10;Microservices&#10;Cloud Infrastructure"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        name="technologies"
                        value={serviceFormData.technologies}
                        onChange={handleServiceFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2 font-semibold">Icon Name</label>
                      <input
                        type="text"
                        name="icon"
                        value={serviceFormData.icon}
                        onChange={handleServiceFormChange}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="e.g., Code, Zap, Rocket"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={serviceLoading}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white rounded transition-all font-semibold"
                    >
                      {serviceLoading ? 'Saving...' : editingService ? 'Update Service' : 'Add Service'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddServiceForm(false);
                        setEditingService(null);
                      }}
                      className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {serviceLoading && !showAddServiceForm ? (
                <div className="text-center py-12">
                  <p className="text-slate-400">Loading services...</p>
                </div>
              ) : services.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service._id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-blue-500/50 transition">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-white">{service.title}</h3>
                      </div>

                      <p className="text-slate-300 text-sm mb-3 line-clamp-2">{service.description}</p>

                      <div className="mb-3">
                        <p className="text-xs text-slate-400 mb-2">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {service.features.slice(0, 2).map((feature, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                              {feature}
                            </span>
                          ))}
                          {service.features.length > 2 && (
                            <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                              +{service.features.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 flex flex-wrap gap-1">
                        {service.technologies.slice(0, 2).map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                        {service.technologies.length > 2 && (
                          <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                            +{service.technologies.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-all"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-all"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">No services found. Click "Add Service" to create one.</p>
                </div>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              
              {deleteMessage && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 flex items-center justify-between">
                  <span>{deleteMessage}</span>
                  <button onClick={() => setDeleteMessage('')}>
                    <X size={20} />
                  </button>
                </div>
              )}
              
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-slate-400">Loading users...</p>
                </div>
              ) : users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-slate-400">Name</th>
                        <th className="text-left py-3 px-4 text-slate-400">Email</th>
                        <th className="text-left py-3 px-4 text-slate-400">Phone</th>
                        <th className="text-left py-3 px-4 text-slate-400">Joined Date</th>
                        <th className="text-left py-3 px-4 text-slate-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id} className="border-b border-slate-800 hover:bg-slate-800/30 transition">
                          <td className="py-3 px-4 text-white">{user.name}</td>
                          <td className="py-3 px-4 text-slate-300">{user.email}</td>
                          <td className="py-3 px-4 text-slate-300">{user.phone}</td>
                          <td className="py-3 px-4 text-slate-400">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={async () => {
                                if (window.confirm(`Delete user ${user.name}?`)) {
                                  try {
                                    await adminAPI.deleteUser(user._id, token);
                                    setUsers(users.filter(u => u._id !== user._id));
                                    setDeleteMessage(`User ${user.name} deleted successfully`);
                                    setTimeout(() => setDeleteMessage(''), 3000);
                                  } catch (error) {
                                    console.error('Error deleting user:', error);
                                  }
                                }
                              }}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">No users found</p>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Admin Information</h3>
                  <p className="text-slate-400">Name: {adminData?.name}</p>
                  <p className="text-slate-400">Email: {adminData?.email}</p>
                  <p className="text-slate-400">Role: <span className="text-red-400">{adminData?.role?.toUpperCase()}</span></p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Additional settings features coming soon...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};
