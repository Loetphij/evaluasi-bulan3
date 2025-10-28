import { Link } from "react-router-dom";
import type { Product } from "../contexts/ProductContext";

export const ProductCard = ({ product }: { product: Product }) => (
  <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
    <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
    <h3 className="font-semibold mt-2">{product.title}</h3>
    <p className="text-gray-600">${product.price}</p>
    <Link to={`/products/${product.id}`} className="text-blue-500 text-sm mt-2 inline-block">
      Detail
    </Link>
  </div>
);
