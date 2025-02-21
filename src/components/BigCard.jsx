import React from "react";
import defaultImage from "../assets/default.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";


export default function BigCard({ product, onClick, onAddToBasket }) {
  return (
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
        className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded hover:bg-blue-600"
        onClick={(e) => {
          e.stopPropagation();
          onAddToBasket(product);
        }}
      >
        Add to Basket
      </button>
      <div className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
        {product.name}
      </div>
      <div className="absolute bottom-2 right-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
        {product.price}€
      </div>
    </div>
  );
}
