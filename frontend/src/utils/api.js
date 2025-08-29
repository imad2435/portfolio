import axios from 'axios';

// Create a new instance of axios
const api = axios.create({
  // The base URL for all API requests will be prepended,
  // but since we use a proxy, we can just use '/api'
  baseURL: '/api',
});

/*
  ===========================================================================
  * INTERCEPTOR *
  ! This is the magic that adds the token to our requests
  ===========================================================================
*/
// This function will be called before every request is sent using this 'api' instance.
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;