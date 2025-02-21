import React, { useContext } from "react";
import defaultImage from "../assets/default.jpg";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProductById } from "../services/productService";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { addProductToBasket } from "../services/userService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: product,
        isLoading,
        error,
    } = useQuery(["product", id], () => fetchProductById(id));
    const { user } = useContext(AuthContext);

    // Placeholder function for adding product to basket.
    const handleAddToBasket = async (product) => {
        if (!user) {
          navigate("/login");
          return;
        }
        try {
          await addProductToBasket(user._id, id || id);
          alert("Product added to basket!");
        } catch (err) {
          // Assuming the service throws an error with a meaningful message
          alert(err.message);
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
                        src={
                            product.imageUrl
                                ? `${API_URL}/${product.imageUrl}`
                                : defaultImage
                        }
                        alt={product.name}
                        className="rounded shadow-lg w-full max-w-md object-cover"
                    />
                </div>
                {/* Product Details */}
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl text-gray-800 mb-2">
                        Price:{" "}
                        <span className="font-semibold">{product.price}€</span>
                    </p>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    <button
                        onClick={handleAddToBasket}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Add to Basket
                    </button>
                </div>
            </div>
        </div>
    );
}
