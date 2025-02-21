const Cards = ({ name, price, image }) => (
    <div className="border p-4">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <h2>{name}</h2>
      <p>{price}€</p>
    </div>
  );
  
  export default Cards;
  