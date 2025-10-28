import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../contexts/ProductContext";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-center text-red-600">Terjadi kesalahan.</p>;
  if (!product) return <p className="p-4 text-center">Produk tidak ditemukan.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={product.image} alt={product.title} className="w-60 h-60 object-contain mx-auto" />
      <h1 className="text-2xl font-semibold mt-4">{product.title}</h1>
      <p className="text-gray-600">{product.category}</p>
      <p className="mt-4">{product.description}</p>
      <p className="mt-4 text-xl font-bold">${product.price}</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
    </div>
  );
};
