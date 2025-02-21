import defaultImage from '../assets/default.jpg';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function VerySmallCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-32 h-32 relative cursor-pointer flex-shrink-0"
    >
      <img
        src={product.imageUrl ? `${API_URL}/${product.imageUrl}` : defaultImage}
        alt={product.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-1 left-1 text-white text-xs font-semibold bg-black/50 px-1 py-[1px] rounded">
        {product.name}
      </div>
      <div className="absolute bottom-1 right-1 text-white text-xs font-semibold bg-black/50 px-1 py-[1px] rounded">
        {product.price}€
      </div>
    </div>
  );
}
