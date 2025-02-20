export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      {/* Title */}
      <div className="text-xl font-bold text-black">my_eshop</div>

      {/* Navigation Links */}
      <nav className="hidden md:block space-x-4">
        <a href="#" className="hover:underline">Homme</a>
        <a href="#" className="hover:underline">Femme</a>
        <a href="#" className="hover:underline">Other</a>
      </nav>

      {/* Search & Basket */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-2 py-1 rounded focus:outline-none"
        />
        <button className="relative px-2 py-1 bg-black text-white rounded hover:opacity-80">
          Basket
        </button>
        <button className="relative px-2 py-1 bg-black text-white rounded hover:opacity-80">
          Nouveau produit
        </button>
      </div>
    </header>
  );
}