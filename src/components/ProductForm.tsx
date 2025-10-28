import React, { useState } from "react";
import type { Product } from "../contexts/ProductContext";

type Props = {
  onSubmit: (product: Product) => void;
  initialData?: Product;
};

export const ProductForm = ({ onSubmit, initialData }: Props) => {
  const [form, setForm] = useState<Product>(
    initialData || {
      id: Date.now(),
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    }
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file); // simpan gambar sebagai Base64 di state
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-2"
    >
      <input
        type="text"
        placeholder="Nama Produk"
        className="border p-2 w-full rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        type="number"
        placeholder="Harga"
        className="border p-2 w-full rounded"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
      />
      <textarea
        placeholder="Deskripsi"
        className="border p-2 w-full rounded"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Kategori"
        className="border p-2 w-full rounded"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 w-full rounded cursor-pointer"
      />
      {form.image && (
        <img src={form.image} alt="Preview" className="h-32 object-contain mt-2" />
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Simpan
      </button>
    </form>
  );
};
