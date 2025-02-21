import React, { useState, useEffect, useRef, useContext } from "react";
import { fetchProductsByQuery } from "../services/productService";
import VerySmallCard from "./VerySmallCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { removeProductFromBasket } from "../services/userService";
import BasketModal from "./BasketModal"; // Existing basket modal
import AddProductModal from "./AddProductModal"; // New product form modal
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // State for modals
  const [showBasketModal, setShowBasketModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
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
    return () => clearTimeout(timerRef.current);
  }, [searchQuery]);

  const handleResultClick = (product) => {
    navigate(`/products/${product._id || product.id}`);
    setShowResults(false);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleBasketClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowBasketModal(true);
  };

  const handleDeleteFromBasket = async (product) => {
    if (!user) return;
    try {
      await removeProductFromBasket(user._id, product._id || product.id);
      const updatedBasket = user.basket.filter(
        (id) => id !== (product._id || product.id)
      );
      setUser({ ...user, basket: updatedBasket });
      alert("Product removed from basket.");
    } catch (err) {
      console.error("Error removing product from basket:", err);
      alert(err.message || "Failed to remove product from basket.");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent flex items-center justify-between px-6 py-4">
        <div className="text-[45px] ml-4 font-bold text-black">IPSSI'SHOP</div>

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
          {user ? (
            <>
              {user.isAdmin ? (
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="relative flex items-center px-2 py-1 bg-black text-white rounded hover:opacity-80"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-1" />
                  Nouveau produit
                </button>
              ) : (
                <button
                  onClick={handleBasketClick}
                  className="relative px-2 py-1 bg-white text-black rounded hover:opacity-80"
                >
                  <FontAwesomeIcon icon={faShoppingBasket} className="mr-1 text-black" />
                  Basket
                </button>
              )}
              <button
                onClick={handleLogout}
                className="relative px-2 py-1 bg-red-600 text-white rounded hover:opacity-80"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="relative px-2 py-1 bg-black text-white rounded hover:opacity-80"
            >
              Sign In
            </button>
          )}
        </div>

        {showResults && searchResults.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 top-24 bg-white border shadow-lg z-10">
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

      {showBasketModal && user && (
        <BasketModal
          userId={user._id}
          onClose={() => setShowBasketModal(false)}
          onDelete={handleDeleteFromBasket}
        />
      )}

      {showAddProductModal && user && user.isAdmin && (
        <AddProductModal onClose={() => setShowAddProductModal(false)} />
      )}
    </>
  );
}
