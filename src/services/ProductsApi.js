const API_URL = "http://localhost:5000/api/products";

const ProductsApi = {
  getProducts: async () => {
    const response = await fetch(API_URL);
    return response.json();
  },
  getProductById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  },
  addProduct: async (product) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return response.json();
  },
  deleteProduct: (product) => {
    const response = await fetch(API_URL/${product}, {
      method: 'DELETE',
      headers: { "content-type": "application/json" }
    }).then(() => {
      console.log(`Post ${product} supprimé`)
    }).catch((error) => {
      console.error(`Erreur lors de la suppression :`, error);
    })
  }
};

export default ProductsApi;

