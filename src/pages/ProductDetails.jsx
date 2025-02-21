import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsApi from "../services/ProductsApi";
import Bouton from "../components/bouton/Bouton";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    ProductsApi.getProductById(id).then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="container">
      <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
      <h1>{product.name}</h1>
      <p>{product.price}€</p>
      <p>{product.description}</p>
      <Bouton label="Ajouter au panier" onClick={() => alert("Ajouté au panier !")} />
    </div>
  );
};

export default ProductDetails;
