import defaultImage from '../assets/default.jpg';

export default function BigCard({ product, onClick }) {
  return (
    <div
      className="relative aspect-square overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={defaultImage}
        alt={product.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
        {product.name}
      </div>
      <div className="absolute bottom-2 right-2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
        {product.price}€
      </div>
    </div>
  );
}
