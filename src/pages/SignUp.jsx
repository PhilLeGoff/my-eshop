import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService"; // see sample service below
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password, isAdmin });
      setUser(response.user);

      if (response.user.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMsg("Signup failed, please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded text-black">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="mr-2"
            />
            Register as admin
          </label>
        </div>
        <button type="submit" className="w-full bg-black text-white py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
