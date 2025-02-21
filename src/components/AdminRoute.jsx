import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute() {
  const { user } = useContext(AuthContext);
  if (!user || !user.isAdmin) {
    // Optionally, you might redirect to a "not authorized" page.
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
