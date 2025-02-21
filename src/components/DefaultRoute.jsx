// src/components/DefaultRoute.jsx
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DefaultRoute() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.isAdmin) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/products", { replace: true });
    }
  }, [user, navigate]);

  return null;
}
