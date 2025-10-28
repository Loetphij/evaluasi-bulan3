import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";

export const Products = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  // 🔍 Filter produk berdasarkan input search
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Produk</h1>
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Grid produk */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          Produk tidak ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
