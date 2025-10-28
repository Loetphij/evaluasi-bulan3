import React, { useState, useCallback } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductForm } from "../components/ProductForm";
import type { Product } from "../contexts/ProductContext";

export const Dashboard = () => {
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = useCallback(
    (product: Product) => {
      addProduct(product);
      setShowAddModal(false);
    },
    [addProduct]
  );

  const handleEdit = useCallback(
    (product: Product) => {
      editProduct(product.id, product);
      setEditing(null);
    },
    [editProduct]
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Admin</h2>

      {/* Tombol Tambah Produk */}
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Tambah Produk
      </button>

      {/* Grid Produk */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {products.map((p) => (
            <div
            key={p.id}
            className="flex items-center border rounded p-3 gap-4 bg-white shadow-sm"
            >
            {/* Gambar di kiri */}
            <div className="w-32 h-32 flex-shrink-0">
                <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-contain rounded"
                />
            </div>

            {/* Info produk di kanan */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                <h3 className="font-semibold text-sm line-clamp-2">{p.title}</h3>
                <p className="text-gray-600 text-sm mt-1">${p.price}</p>
                </div>

                <div className="flex gap-2 mt-3">
                <button
                    onClick={() => setEditing(p)}
                    className="text-blue-500 text-sm underline"
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-500 text-sm underline"
                >
                    Hapus
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>


      {/* Modal Tambah Produk */}
      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative bg-white/90 backdrop-blur-md p-6 rounded shadow-lg w-96 z-10">
            <h3 className="font-bold text-lg mb-4">Tambah Produk</h3>
            <ProductForm onSubmit={handleAdd} />
            <button
              onClick={() => setShowAddModal(false)}
              className="mt-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Modal Edit Produk */}
      {editing && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative bg-white/90 backdrop-blur-md p-6 rounded shadow-lg w-96 z-10">
            <h3 className="font-bold text-lg mb-4">Edit Produk</h3>
            <ProductForm initialData={editing} onSubmit={handleEdit} />
            <button
              onClick={() => setEditing(null)}
              className="mt-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
