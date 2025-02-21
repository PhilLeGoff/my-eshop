import { useEffect, useState } from "react";
import ProductsApi from "../services/ProductsApi";
import Cards from "../components/Cards";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductsApi.getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <>
      <h1>Nos Produits Jacquemus</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`}>
            <Cards {...product} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Products;
