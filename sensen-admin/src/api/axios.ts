import axios from 'axios';

// Create a new Axios instance with a base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // All requests will be prefixed with this
});

// Add a request interceptor to include the auth token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// You can also add a response interceptor for global error handling (e.g., 401 unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error is a 401 and the original request was NOT to the login endpoint
    if (
      error.response &&
      error.response.status === 401 &&
      error.config.url !== '/auth/login'
    ) {
      // This means the token is likely invalid or expired for a protected route
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    // For all other errors (including 401 from login), just let the promise reject
    // so the component's catch block can handle it.
    return Promise.reject(error);
  }
);


export default apiClient;
