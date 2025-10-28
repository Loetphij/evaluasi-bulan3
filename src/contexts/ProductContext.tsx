import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ProductContextType = {
  products: Product[];
  addProduct: (p: Product) => void;
  editProduct: (id: number, updated: Product) => void;
  deleteProduct: (id: number) => void;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const addProduct = (p: Product) => setProducts((prev) => [...prev, p]);
  const editProduct = (id: number, updated: Product) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  const deleteProduct = (id: number) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
