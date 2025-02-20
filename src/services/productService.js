import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Fetch products from the backend with pagination.
 * @param {number} page - The page number.
 * @param {number} limit - Number of products per page.
 * @returns {Promise<Array>} An array of products.
 */
export async function fetchAllProducts(page = 1, limit = 10) {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("fetchAllProducts error:", error);
    throw error;
  }
}

/**
 * Fetch products from the backend based on a search query.
 * @param {string} query - The search query string.
 * @returns {Promise<Array>} An array of matching products.
 */
export async function fetchProductsByQuery(query) {
  try {
    const response = await axios.get(`${API_URL}/products/search`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("fetchProductsByQuery error:", error);
    throw error;
  }
}

/**
 * Fetch a single product by its id.
 * @param {string} id - The product id.
 * @returns {Promise<Object>} The product details.
 */
export async function fetchProductById(id) {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchProductById:", error);
    throw error;
  }
}
