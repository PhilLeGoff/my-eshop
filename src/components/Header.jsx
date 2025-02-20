import React, { useState, useEffect, useRef, useContext } from "react";
import { fetchProductsByQuery } from "../services/productService";
import VerySmallCard from "./VerySmallCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    // If query is empty, clear results and hide popup.
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Clear any existing timer.
    if (timerRef.current) clearTimeout(timerRef.current);

    // Set a new timer to fetch results after 1 second.
    timerRef.current = setTimeout(() => {
      fetchProductsByQuery(searchQuery)
        .then((results) => {
          setSearchResults(results);
          setShowResults(true);
        })
        .catch((error) => {
          console.error("Error fetching search results", error);
          setSearchResults([]);
          setShowResults(false);
        });
    }, 1000);

    // Cleanup on unmount or query change.
    return () => clearTimeout(timerRef.current);
  }, [searchQuery]);

  const handleResultClick = (product) => {
    // Navigate to product detail page using product id.
    navigate(`/products/${product._id || product.id}`);
    setShowResults(false);
  };

  const handleLogout = () => {
    setUser(null);
    // Optionally, clear any stored tokens here.
    navigate("/login");
  };

  return (
    <header className="relative flex items-center justify-between px-6 py-4 border-b">
      {/* Title */}
      <div className="text-xl font-bold text-black">my_eshop</div>

      {/* Navigation Links */}
      <nav className="hidden md:block space-x-4">
        <a href="#" className="hover:underline">
          Homme
        </a>
        <a href="#" className="hover:underline">
          Femme
        </a>
        <a href="#" className="hover:underline">
          Other
        </a>
      </nav>

      {/* Search & Conditional Button */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-2 py-1 rounded focus:outline-none"
          />
        </div>
        {user && user.isAdmin ? (
          <button className="relative px-2 py-1 bg-black text-white rounded hover:opacity-80">
            Nouveau produit
          </button>
        ) : (
          <button className="relative px-2 py-1 bg-black text-white rounded hover:opacity-80">
            Basket
          </button>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="relative px-2 py-1 bg-red-600 text-white rounded hover:opacity-80"
          >
            Logout
          </button>
        )}
      </div>
      {showResults && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 top-16 bg-white border shadow-lg z-10">
          <div className="flex overflow-x-auto p-2 space-x-2 gap-2">
            {searchResults.map((product) => (
              <VerySmallCard
                key={product._id || product.id || product.name}
                product={product}
                onClick={() => handleResultClick(product)}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
