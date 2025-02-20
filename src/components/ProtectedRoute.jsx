import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { user } = useContext(AuthContext);

  // If no user is logged in, redirect to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the requested route.
  return <Outlet />;
}
