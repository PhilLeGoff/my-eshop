import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchAllProducts, deleteProduct } from "../services/productService";
import AdminProductCard from "../components/AdminProductCard";
import EditProductModal from "../components/EditProductModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { data: products, isLoading, error } = useQuery("adminProducts", () =>
    fetchAllProducts(1, 1000)
  );

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct._id || selectedProduct.id);
        setShowConfirmModal(false);
        setSelectedProduct(null);
        queryClient.invalidateQueries("adminProducts");
      } catch (err) {
        console.error("Error deleting product:", err);
        alert(err.message || "Failed to delete product.");
      }
    }
  };

  const handleEditClick = (product) => {
    navigate(`/products/${product._id}`)
  };

  if (isLoading) {
    return <div className="p-4">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading products: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id || product.id} className="relative">
              <AdminProductCard
                product={product}
                onClick={() => handleEditClick(product)}
                onDelete={() => handleDeleteClick(product)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onUpdated={(updatedProduct) => {
            setShowEditModal(false);
            setSelectedProduct(null);
            queryClient.invalidateQueries("adminProducts");
          }}
        />
      )}

      {/* Confirmation Modal for Deletion */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {selectedProduct && selectedProduct.name}
              </span>
              ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
