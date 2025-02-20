const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Fetch products from the backend with pagination.
 * @param {number} page - The page number.
 * @param {number} limit - Number of products per page.
 * @returns {Promise<Array>} An array of products.
 */
export async function fetchAllProducts(page = 1, limit = 10) {
  try {
    const response = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
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
    const response = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Error fetching products by query: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchProductsByQuery error:", error);
    throw error;
  }
}
