import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Sends a login request to the backend.
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} - The login response including token and user data.
 */
export async function loginUser(credentials) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("loginUser error:", error);
    throw error;
  }
}

/**
 * Sends a signup request to the backend.
 * @param {object} userData - { name, email, password, isAdmin }
 * @returns {Promise<object>} - The signup response including token and user data.
 */
export async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("registerUser error:", error);
    throw error;
  }
}
