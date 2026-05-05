// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Service for making requests to the backend
const apiService = {
  // Base fetch wrapper with auth headers
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error.message);
      throw error;
    }
  },

  // Auth endpoints
  auth: {
    login: (credentials) => apiService.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    register: (userData) => apiService.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    getProfile: () => apiService.request('/auth/me'),
  },

  // Threat endpoints
  threats: {
    getAll: (params = '') => apiService.request(`/threats${params}`),
    getById: (id) => apiService.request(`/threats/${id}`),
    create: (threatData) => apiService.request('/threats', {
      method: 'POST',
      body: JSON.stringify(threatData),
    }),
    update: (id, threatData) => apiService.request(`/threats/${id}`, {
      method: 'PUT',
      body: JSON.stringify(threatData),
    }),
    delete: (id) => apiService.request(`/threats/${id}`, {
      method: 'DELETE',
    }),
  },

  // Dashboard endpoints
  dashboard: {
    getStats: () => apiService.request('/dashboard/stats'),
    getSectorData: () => apiService.request('/dashboard/sector-wise'),
    getThreatTypes: () => apiService.request('/dashboard/threat-types'),
    getTrends: () => apiService.request('/dashboard/trends'),
  },

  // Health check
  healthCheck: () => apiService.request('/health'),
};

export default apiService;
