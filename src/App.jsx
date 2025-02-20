import React from "react";
import "./App.css"; // Make sure this includes your Tailwind imports
import Products from "./pages/Products";

function App() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-white">
      <Products />
    </div>
  );
}

export default App;
