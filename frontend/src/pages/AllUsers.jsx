import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Dynamically determine API URL based on current hostname
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  return `${protocol}//${hostname}:5000/api`;
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    const API_URL = getApiUrl();
    const adminKey = localStorage.getItem('ADMIN_API_KEY') || import.meta.env.VITE_ADMIN_KEY;
    try {
      const response = await axios.get(`${API_URL}/user/all`, {
        headers: adminKey ? { 'x-admin-key': adminKey } : {}
      });
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        setError('Failed to load users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Admin access required or server error. Set admin key and retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetAdminKey = () => {
    const key = prompt('Enter Admin Key (will be saved locally):');
    if (key) {
      localStorage.setItem('ADMIN_API_KEY', key);
      setLoading(true);
      setError(null);
      fetchAllUsers();
    }
  };

  const handleDeleteAll = async () => {
    const API_URL = getApiUrl();
    const adminKey = localStorage.getItem('ADMIN_API_KEY') || import.meta.env.VITE_ADMIN_KEY;
    if (!adminKey) {
      alert('Set admin key first.');
      return;
    }
    if (!confirm('Delete ALL users? This cannot be undone.')) return;
    try {
      await axios.delete(`${API_URL}/user`, {
        headers: { 'x-admin-key': adminKey }
      });
      await fetchAllUsers();
      alert('All users deleted.');
    } catch (e) {
      alert('Failed to delete users. Check admin key and try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={fetchAllUsers}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => {
                const key = prompt('Enter Admin Key (will be saved locally):');
                if (key) {
                  localStorage.setItem('ADMIN_API_KEY', key);
                  window.location.reload();
                }
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Set Admin Key
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">All Registered Users</h1>
            <p className="text-gray-600">Total Users: {users.length}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSetAdminKey}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Set Admin Key
            </button>
            <button
              onClick={handleDeleteAll}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete All
            </button>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Users Found</h2>
            <p className="text-gray-600 mb-6">No users have been registered yet.</p>
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Register First User
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {user.name?.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                    {user.bloodGroup}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{user.name}</h3>
                <p className="text-gray-600 mb-4">Age: {user.age} years</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-semibold mr-2">Emergency Contact:</span>
                    <span>{user.emergencyContact?.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-semibold mr-2">Phone:</span>
                    <a
                      href={`tel:${user.emergencyContact?.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {user.emergencyContact?.phone}
                    </a>
                  </div>
                  {user.allergies && (
                    <div className="text-sm">
                      <span className="font-semibold text-yellow-700">⚠️ Allergies:</span>
                      <span className="text-gray-700 ml-2">{user.allergies}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <Link
                    to={`/profile/${user._id}`}
                    className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/dashboard/${user._id}`}
                    className="flex-1 text-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    Dashboard
                  </Link>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Registered: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;


