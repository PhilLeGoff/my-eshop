import React, { useState, useEffect, useRef, useContext } from "react";
import { useQuery } from "react-query";
import { fetchAllProducts } from "../services/productService";
import BigCard from "./BigCard";
import SmallCard from "./SmallCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { addProductToBasket } from "../services/userService"; // Service that calls backend

export default function HeroSection() {
  // Pagination state: current page (default 1)
  const [page, setPage] = useState(1);
  const limit = 10; // 10 products per page
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // React Query to fetch paginated products
  const { data: products, isLoading, error } = useQuery(
    ["products", page],
    () => fetchAllProducts(page, limit),
    { keepPreviousData: true }
  );

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4">Error fetching products</div>;

  // Organize products into alternating rows.
  const rows = [];
  let index = 0;
  const pattern = [2, 3]; // Big row uses 2 items, small row uses 3 items.
  let patternIndex = 0;

  while (index < products.length) {
    const count = pattern[patternIndex % pattern.length];
    const rowItems = products.slice(index, index + count);
    if (rowItems.length > 0) {
      rows.push({ type: patternIndex % 2 === 0 ? "big" : "small", items: rowItems });
    }
    index += count;
    patternIndex++;
  }

  const handleCardClick = (product) => {
    // Navigate to product detail page using product id.
    navigate(`/products/${product._id || product.id}`);
  };

  const handleAddToBasket = async (product) => {
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

  return (
    <section className="">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={
            row.type === "big"
              ? "grid grid-cols-1 md:grid-cols-2 mb-2"
              : "grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 px-2"
          }
        >
          {row.items.map((product, idx) =>
            row.type === "big" ? (
              <BigCard
                key={idx}
                product={product}
                onClick={() => handleCardClick(product)}
                onAddToBasket={() => handleAddToBasket(product)}
              />
            ) : (
              <SmallCard
                key={idx}
                product={product}
                onClick={() => handleCardClick(product)}
                onAddToBasket={() => handleAddToBasket(product)}
              />
            )
          )}
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-4 mb-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </section>
  );
}
