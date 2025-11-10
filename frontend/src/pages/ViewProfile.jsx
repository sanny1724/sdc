import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';

// Dynamically determine API URL based on current hostname
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Use current hostname and port 5000 for API
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const apiUrl = `${protocol}//${hostname}:5000/api`;
  console.log('API URL:', apiUrl); // Debug log
  return apiUrl;
};

const ViewProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    const API_URL = getApiUrl();
    const url = `${API_URL}/user/${id}`;
    console.log('Fetching user from:', url); // Debug log
    
    try {
      const response = await axios.get(url);
      console.log('User data received:', response.data); // Debug log
      if (response.data.success && response.data.data) {
        setUser(response.data.data);
      } else {
        setError('Profile data not available');
        setErrorDetails('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      console.error('Error response:', error.response); // Debug log
      
      if (error.response) {
        // Server responded with error
        setError(`Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
        setErrorDetails(error.response.data?.error || 'Check console for details');
      } else if (error.request) {
        // Request made but no response
        setError('Cannot connect to server');
        setErrorDetails('Make sure the backend server is running and accessible');
      } else {
        // Something else happened
        setError('Error loading profile');
        setErrorDetails(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-2">{error}</p>
          {errorDetails && (
            <p className="text-sm text-gray-500 mb-4">{errorDetails}</p>
          )}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-xs text-gray-600 mb-2"><strong>Debug Info:</strong></p>
            <p className="text-xs text-gray-600">User ID: {id}</p>
            <p className="text-xs text-gray-600">API URL: {getApiUrl()}/user/{id}</p>
            <p className="text-xs text-gray-600">Current URL: {window.location.href}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-block bg-red-100 border-l-4 border-red-500 p-4 rounded mb-4">
            <p className="text-red-800 font-semibold">
              🚨 EMERGENCY PROFILE - If you found this person, please contact their emergency contact immediately.
            </p>
          </div>
        </div>
        <ProfileCard user={user} />
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This is a public emergency profile. For privacy, only essential information is displayed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;

