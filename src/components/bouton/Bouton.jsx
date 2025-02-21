import React from "react";
import "./Bouton.module.css";

const Bouton = ({ label, onClick }) => (
  <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
    {label}
  </button>
);

export default Bouton;

