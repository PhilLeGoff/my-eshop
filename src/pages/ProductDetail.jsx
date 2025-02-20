import React from "react";
import defaultImage from '../assets/default.jpg';

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProductById } from "../services/productService";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useQuery(
    ["product", id],
    () => fetchProductById(id)
  );

  if (isLoading) return <div className="p-4">Loading product details...</div>;
  if (error) return <div className="p-4">Error loading product details</div>;

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img
        src={defaultImage}
        alt={product.name}
        className="w-full max-w-md object-cover mb-4"
      />
      <p className="text-lg mb-2">Price: {product.price}€</p>
      <p className="text-base">{product.description}</p>
    </div>
  );
}
