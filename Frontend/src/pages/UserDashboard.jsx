import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, Settings, User, Mail, Phone, Edit2, Save, XCircle } from 'lucide-react';
import { tokenStorage, contactAPI, userAPI } from '../services/apiService';

const  UserDashboard = ()=> {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const token = tokenStorage.getUserToken();

  // Update date/time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load user data on component mount
  useEffect(() => {
    if (!token) {
      window.location.hash = '#/user-login';
      return;
    }
    loadUserProfile();
  }, [token]);

  // Load messages when tab changes
  useEffect(() => {
    if (activeTab === 'messages' && userData) {
      loadUserMessages();
    }
  }, [activeTab, userData]);

  // Load settings when tab changes
  useEffect(() => {
    if (activeTab === 'settings' && token) {
      loadUserSettings();
    }
  }, [activeTab, token]);

  const loadUserProfile = async () => {
    try {
      setProfileLoading(true);
      const res = await userAPI.getProfile(token);
      if (res.user) {
        setUserData(res.user);
        setEditData({
          name: res.user.name || '',
          phone: res.user.phone || ''
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setMessage('Error loading profile. Please refresh.');
    } finally {
      setProfileLoading(false);
    }
  };

  const loadUserMessages = async () => {
    try {
      setMessagesLoading(true);
      console.log('[loadUserMessages] userData:', userData);
      if (userData?.email) {
        console.log('[loadUserMessages] Fetching messages for:', userData.email);
        const res = await contactAPI.getUserConversation(userData.email);
        console.log('[loadUserMessages] Response:', res);
        setMessages(res.contacts || []);
      } else {
        console.log('[loadUserMessages] No email found in userData');
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    } finally {
      setMessagesLoading(false);
    }
  };

  const loadUserSettings = async () => {
    try {
      setSettingsLoading(true);
      const res = await userAPI.getSettings(token);
      if (res.settings) {
        setSettings(res.settings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setSettings({
        emailNotifications: true,
        profileVisibility: 'public'
      });
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const updateData = {
        name: editData.name,
        phone: editData.phone
      };
      
      const res = await userAPI.updateProfile(updateData, token);
      
      if (res.user) {
        setUserData(res.user);
        setIsEditing(false);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsUpdate = async () => {
    try {
      setLoading(true);
      const res = await userAPI.updateSettings(settings, token);
      
      if (res.settings) {
        setSettings(res.settings);
        setMessage('Settings updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      setMessage('Error updating settings. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    tokenStorage.removeUserToken();
    tokenStorage.removeUserData();
    window.location.hash = '#/';
  };

  const dashboardMenuItems = [
    { icon: User, label: 'Profile', id: 'profile' },
    { icon: Mail, label: 'Messages', id: 'messages' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 flex">
      {/* Sidebar */}
      <div className={`fixed lg:relative top-20 lg:top-0 w-64 h-[calc(100vh-5rem)] lg:h-full bg-slate-900/50 border-r border-slate-800 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } z-40`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-8">Dashboard</h2>
          
          {/* User Info Card */}
          <div className="bg-slate-800/50 rounded-lg p-4 mb-8 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <User size={24} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-400">Welcome</p>
                <p className="text-white font-semibold truncate">{userData?.name}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400">{userData?.email}</p>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {dashboardMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-blue-400'
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
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-6 left-4 z-50 p-2 bg-slate-800 rounded-lg text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
                <p className="text-slate-400">Manage your profile and account settings</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-right">
                <p className="text-sm text-slate-400">Current Date & Time</p>
                <p className="text-xl font-bold text-blue-400">{currentDateTime.toLocaleDateString()}</p>
                <p className="text-lg text-blue-300">{currentDateTime.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>

          {/* Message Alert */}
          {message && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg text-blue-400 flex items-center justify-between">
              <span>{message}</span>
              <button onClick={() => setMessage('')}>
                <XCircle size={20} />
              </button>
            </div>
          )}

          {/* Tab Content */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 backdrop-blur-sm">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
                {profileLoading ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400">Loading profile...</p>
                  </div>
                ) : !userData ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400">Error loading profile</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                      {!isEditing && (
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setEditData({
                              name: userData?.name || '',
                              phone: userData?.phone || ''
                            });
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                        >
                          <Edit2 size={20} />
                          Edit Profile
                        </button>
                      )}
                    </div>

                {isEditing ? (
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Email Field (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={userData?.email}
                        disabled
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-500 cursor-not-allowed"
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleEditChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200"
                      >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Display Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Full Name</label>
                        <p className="text-lg text-white font-semibold">{userData?.name}</p>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Email Address</label>
                        <p className="text-lg text-white font-semibold flex items-center gap-2">
                          <Mail size={18} className="text-blue-400" />
                          {userData?.email}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Phone Number</label>
                        <p className="text-lg text-white font-semibold flex items-center gap-2">
                          <Phone size={18} className="text-blue-400" />
                          {userData?.phone}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-400 mb-2">User ID</label>
                        <p className="text-lg text-white font-semibold font-mono">{userData?.id}</p>
                      </div>
                    </div>
                  </div>
                )}
                  </>
                )}
              </>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Your Messages</h2>
                
                {selectedMessage ? (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Message Thread</h3>
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-all"
                      >
                        Back
                      </button>
                    </div>

                    {/* Original Message */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-white">Your Message</h4>
                          <p className="text-slate-400 text-sm">Sent on {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-blue-400 font-semibold mb-2">Subject: {selectedMessage.subject}</p>
                      <p className="text-slate-200">{selectedMessage.message}</p>
                    </div>

                    {/* Admin Replies */}
                    {selectedMessage.replies && selectedMessage.replies.length > 0 ? (
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-lg mb-4">Admin Replies:</h4>
                        {selectedMessage.replies.map((reply, index) => (
                          <div key={index} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
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
                    ) : (
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                        <p className="text-slate-400">No replies yet. Please check back later.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {messagesLoading ? (
                      <div className="text-center py-12">
                        <p className="text-slate-400">Loading messages...</p>
                      </div>
                    ) : messages.length > 0 ? (
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div 
                            key={msg._id} 
                            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition cursor-pointer"
                            onClick={() => setSelectedMessage(msg)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white">{msg.subject}</h3>
                                <p className="text-sm text-slate-400">{msg.name}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  msg.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                                  msg.status === 'read' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'
                                }`}>
                                  {msg.status?.toUpperCase()}
                                </span>
                                {msg.replies && msg.replies.length > 0 && (
                                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                                    {msg.replies.length} replies
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-slate-300 text-sm mb-3 line-clamp-2">{msg.message}</p>
                            <p className="text-xs text-slate-500">
                              Sent: {new Date(msg.createdAt).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-slate-400">No messages yet</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                
                {settingsLoading ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400">Loading settings...</p>
                  </div>
                ) : !settings ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400">Error loading settings</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Notification Settings */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">Email Notifications</h3>
                          <p className="text-slate-400 text-sm">Receive email updates about your account</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={settings?.emailNotifications || false}
                          onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Profile Visibility</h3>
                        <select 
                          value={settings?.profileVisibility || 'public'}
                          onChange={(e) => setSettings({...settings, profileVisibility: e.target.value})}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                          <option value="friends">Friends Only</option>
                        </select>
                        <p className="text-slate-400 text-sm mt-2">Control who can see your profile</p>
                      </div>
                    </div>

                    {/* Save Settings */}
                    <button 
                      onClick={handleSettingsUpdate}
                      disabled={loading || settingsLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                    >
                      {loading ? 'Saving...' : 'Save Settings'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Stats - Only show on Profile Tab */}
          {activeTab === 'profile' && (
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                <p className="text-slate-400 text-sm mb-2">Account Status</p>
                <p className="text-2xl font-bold text-green-400">Active</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                <p className="text-slate-400 text-sm mb-2">Member Since</p>
                <p className="text-2xl font-bold text-blue-400">
                  {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                <p className="text-slate-400 text-sm mb-2">Last Updated</p>
                <p className="text-2xl font-bold text-purple-400">
                  {userData?.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : 'N/A'}
                </p>
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
}

export default UserDashboard;