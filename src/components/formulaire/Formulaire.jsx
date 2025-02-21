import { useState } from "react";
import ProductsApi from "../../services/ProductsApi";

const Formulaire = () => {
  const [product, setProduct] = useState({ name: "", price: "", image: "", description: "" });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await ProductsApi.addProduct(product);
    alert("Produit ajouté !");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nom" onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      <input placeholder="Prix" onChange={(e) => setProduct({ ...product, price: e.target.value })} />
      <input placeholder="Image URL" onChange={(e) => setProduct({ ...product, image: e.target.value })} />
      <textarea placeholder="Description" onChange={(e) => setProduct({ ...product, description: e.target.value })} />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default Formulaire;



