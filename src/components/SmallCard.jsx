import React, { useContext, useState } from "react";
import defaultImage from "../assets/default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


export default function SmallCard({ product, onClick, onAddToBasket }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const handleAddToBasket = (e) => {
    e.stopPropagation();
    if (user) {
      onAddToBasket(product);
    } else {
      setShowSignInPrompt(true);
    }
  };

  return (
    <>
      <div
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <img
        src={product.imageUrl ? `${API_URL}/${product.imageUrl}` : defaultImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleAddToBasket}
          className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faShoppingBasket} className="mr-1" />
          Add to Basket
        </button>
        <div className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
          {product.name}
        </div>
        <div className="absolute bottom-2 right-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
          {product.price}€
        </div>
      </div>
      {showSignInPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-11/12 max-w-sm">
            <p className="mb-4 text-center">Please sign in to add items to your basket.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  navigate("/login");
                  setShowSignInPrompt(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowSignInPrompt(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}