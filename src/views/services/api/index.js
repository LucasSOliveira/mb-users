const API_BASE_URL = import.meta.env.VITE_API_URL;
const url = `${API_BASE_URL}/api`;

const api = {
  post: async (endpoint, data) => {
    const response = await fetch(`${url}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  get: async (endpoint) => {
    const response = await fetch(`${url}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  },
  put: async (endpoint, data) => {
    const response = await fetch(`${url}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (endpoint) => {
    const response = await fetch(`${url}${endpoint}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  },
  patch: async (endpoint, data) => {
    const response = await fetch(`${url}${endpoint}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export default api;
