import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Fetch products from the backend with pagination.
 * @param {number} page - The page number.
 * @param {number} limit - Number of products per page.
 * @returns {Promise<Array>} An array of products.
 */
export async function fetchAllProducts(page = 1, limit = 30) {
  try {
    const response = await axios.get(`${API_URL}/api/products`, {
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
    const response = await axios.get(`${API_URL}/api/products/search`, {
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
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchProductById:", error);
    throw error;
  }
}

/**
 * Delete a product.
 * @param {string} productId - The product's ID to be deleted.
 * @returns {Promise<Object>} The response data.
 */
export async function deleteProduct(productId) {
  try {
    const response = await axios.delete(`${API_URL}/api/products`, {
      data: { id: productId },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(
      error.response?.data?.message || "Error deleting product"
    );
  }
}

/**
 * Creates a product.
 * @param {Object} productData - The updated product data.
 * @returns {Promise<Object>} The updated product.
 */
export async function addProduct(productData) {
  try {
    return await axios.post(`${API_URL}/api/products/`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

/**
 * Update a product by id.
 * @param {string} id - The id of the product to update.
 * @param {Object} productData - The updated product data.
 * @returns {Promise<Object>} The updated product.
 */
export async function updateProduct(id, productData) {
  try {
    const response = await axios.put(`${API_URL}/api/products/${id}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}