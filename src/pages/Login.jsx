import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService"; // Sample auth service using axios/fetch
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      setUser(response.user);

      if (response.user.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg("Login failed, please check your email or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border border-gray-300 rounded shadow-sm bg-white text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Login
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline font-medium"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}
