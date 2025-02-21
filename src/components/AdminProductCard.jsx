import React from "react";
import defaultImage from "../assets/default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";


export default function AdminProductCard({ product, onClick, onDelete }) {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <img
        src={product.imageUrl ? `${API_URL}/${product.imageUrl}` : defaultImage}
        alt={product.name}
        className="w-full h-full object-cover rounded shadow-md"
      />
      {/* Trash Icon Overlay at Top Right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(product);
        }}
        className="absolute top-2 right-2 bg-white bg-opacity-80 p-1 rounded-full hover:bg-opacity-100"
      >
        <FontAwesomeIcon icon={faTrash} className="text-red-500" />
      </button>
      {/* Product Name at Bottom Left */}
      <div className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
        {product.name}
      </div>
      {/* Product Price at Bottom Right */}
      <div className="absolute bottom-2 right-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
        {product.price}€
      </div>
    </div>
  );
}
