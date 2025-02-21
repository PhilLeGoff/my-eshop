import { useNavigate } from "react-router-dom";
import Bouton from "../components/bouton/Bouton";
import Formulaire from "../components/formulaire/Formulaire";
// import useCompteur from "../hooks/useCompteur";

const Accueil = () => {
  const { count, handleIncrement, handleDecrement, handleReset } = useCompteur(0);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/products");
  };

  return (
    <>
      <h1>Bienvenue sur Ipssi Store</h1>
      <Formulaire />
      <Bouton label="Voir les Produits" onClick={handleNavigate} />

      <h2>Quantité sélectionnée : {count}</h2>
      <Bouton label="+ 1" onClick={handleIncrement} />
      <Bouton label="- 1" onClick={handleDecrement} />
      <Bouton label="Reset" onClick={handleReset} />
    </>
  );
};

export default Accueil;
