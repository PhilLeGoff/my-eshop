import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRoute from "../components/AdminRoute";
import DefaultRoute from "../components/DefaultRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Default Route: Redirects based on user role */}
      <Route path="/" element={<DefaultRoute />} />

      {/* Public Product Routes */}
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />

      {/* Admin Routes (only admins can access) */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
