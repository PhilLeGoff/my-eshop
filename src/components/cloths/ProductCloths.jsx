import React from "react";
import "./ProductCloths.module.css";

const ProductCloths = ({ name, image, price }) => (
 return (
    <div className="product-cloths">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{price}€</p>
    </div>
  );
);

export default ProductCloths;
