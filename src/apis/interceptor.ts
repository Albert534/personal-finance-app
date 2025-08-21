import { axiosInstance } from "./api";
import { baseUrl } from "./api";
import axios from "axios";

function getCookie(name : string) {
  const value = `; ${document.cookie}`; // add leading semicolon to simplify parsing
  const parts = value.split(`; ${name}=`);
 if (parts.length === 2) {
  const lastPart = parts.pop();
  if (lastPart) return lastPart.split(';').shift();
  return null;
}
  return null;
}

function deleteCookie(name : string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
}

axiosInstance.interceptors.request.use(request => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  
 
}, error => {
  return Promise.reject(error);
});
axiosInstance.interceptors.response.use(
  response => response, // Directly return successful responses.
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = getCookie('refreshToken'); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await axios.post(
  `${baseUrl}/auth/refresh`,
  {}, // Body can be empty if you only send it in headers
  {
    headers: {
      Authorization: `Bearer ${refreshToken}`, // Sending token in header
    },
  }
);
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        // Store the new access and refresh tokens.
       document.cookie = `accessToken=${accessToken}; Path=/;`;
document.cookie = `refreshToken=${newRefreshToken}; Path=/;`;
        // Update the authorization header with the new access token.
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
     deleteCookie('accessToken');
       deleteCookie('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);