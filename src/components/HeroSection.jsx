import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchAllProducts } from "../services/productService";
import BigCard from "./BigCard";
import SmallCard from "./SmallCard";

export default function HeroSection() {
  // Pagination state: current page (default 1)
  const [page, setPage] = useState(1);
  const limit = 10; // 10 products per page

  // React Query to fetch paginated products
  const { data: products, isLoading, error } = useQuery(
    ["products", page],
    () => fetchAllProducts(page, limit),
    { keepPreviousData: true }
  );

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4">Error fetching products</div>;

  // Organize products into alternating rows.
  // We use a repeating pattern: first row "big" (2 items), then "small" (3 items)
  // This pattern consumes 5 products per cycle.
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
    alert(`Clicked on ${product.name} - Price: ${product.price}€`);
  };

  return (
    <section className="p-4">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={
            row.type === "big"
              ? "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              : "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
          }
        >
          {row.items.map((product, idx) =>
            row.type === "big" ? (
              <BigCard key={idx} product={product} onClick={() => handleCardClick(product)} />
            ) : (
              <SmallCard key={idx} product={product} onClick={() => handleCardClick(product)} />
            )
          )}
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-4">
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
