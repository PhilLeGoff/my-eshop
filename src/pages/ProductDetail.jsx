import React, { useContext, useState } from "react";
import defaultImage from "../assets/default.jpg";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProductById, deleteProduct } from "../services/productService";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { addProductToBasket } from "../services/userService";
import EditProductModal from "../components/EditProductModal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useQuery(
    ["product", id],
    () => fetchProductById(id)
  );
  const { user } = useContext(AuthContext);
  
  const [showEditModal, setShowEditModal] = useState(false);

  const handleAddToBasket = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await addProductToBasket(user._id, product._id || product.id);
      alert("Product added to basket!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProduct = async () => {
    if (!user || !user.isAdmin) return;
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await deleteProduct(product._id || product.id);
        alert("Product deleted.");
        navigate("/admin/dashboard");
      } catch (err) {
        alert(err.message || "Failed to delete product.");
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) return <div className="p-4">Loading product details...</div>;
  if (error) return <div className="p-4">Error loading product details</div>;

  return (
    <div className="container mx-auto p-6 text-black">
      <button
        onClick={handleGoBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Back
      </button>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={product.imageUrl ? `${API_URL}/${product.imageUrl}` : defaultImage}
            alt={product.name}
            className="rounded shadow-lg w-full max-w-md object-cover"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-800 mb-2">
            Price: <span className="font-semibold">{product.price}€</span>
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          {user && user.isAdmin ? (
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Modify Product
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Delete Product
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToBasket}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add to Basket
            </button>
          )}
        </div>
      </div>
      {showEditModal && user && user.isAdmin && (
        <EditProductModal
          product={product}
          onClose={() => setShowEditModal(false)}
          onUpdated={(updatedProduct) => {
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}
