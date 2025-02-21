// src/components/BasketModal.jsx
import React from "react";
import { useQuery } from "react-query";
import { fetchBasketProducts } from "../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function BasketModal({ userId, onClose, onDelete }) {
  const { data, isLoading, error } = useQuery(
    ["basket", userId],
    () => fetchBasketProducts(userId),
    { enabled: !!userId }
  );

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
        {/* Close button as a Font Awesome X icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white border-none text-black hover:text-red-500"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <h2 className="text-xl font-bold text-black text-center mb-4">
          Your Basket
        </h2>
        {isLoading ? (
          <p>Loading basket...</p>
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : data && data.basket && data.basket.length > 0 ? (
          <ul className="space-y-4">
            {data.basket.map((product) => (
              <li
                key={product._id || product.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="text-gray-600 flex gap-5">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.price}€</p>
                </div>
                <button
                  onClick={() => onDelete(product)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your basket is empty.</p>
        )}
      </div>
    </div>
  );
}
