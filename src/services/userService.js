import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

/**
 * Add a product to a user's basket.
 * @param {string} userId - The user's id.
 * @param {string} productId - The product's id.
 * @returns {Promise<Object>} Updated user document.
 */
export async function addProductToBasket(userId, productId) {
  try {
    const response = await axios.post(`${API_URL}/api/users/basket`, { userId, productId });
    return response.data;
  } catch (error) {
    console.error("Error adding product to basket:", error);
    // Re-throw error with a meaningful message if needed.
    throw new Error(error.response?.data?.message || "Error adding product to basket");
  }
}

/**
 * Fetch basket products for a given user.
 * @param {string} userId - The user ID.
 * @returns {Promise<Object>} The user document with populated basket.
 */
export async function fetchBasketProducts(userId) {
  try {
    const response = await axios.get(`${API_URL}/api/users/basket/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching basket products:", error);
    throw new Error(
      error.response?.data?.message || "Error fetching basket products"
    );
  }
}

/**
 * Remove a product from a user's basket.
 * @param {string} userId - The user's ID.
 * @param {string} productId - The product's ID.
 * @returns {Promise<Object>} The updated user document.
 */
export async function removeProductFromBasket(userId, productId) {
  try {
    const response = await axios.delete(`${API_URL}/api/users/basket/${productId}`, {
      data: { userId }
    });
    return response.data;
  } catch (error) {
    console.error("Error removing product from basket:", error);
    throw new Error(
      error.response?.data?.message || "Error removing product from basket"
    );
  }
}