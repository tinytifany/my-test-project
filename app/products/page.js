'use client';

import { useState, useEffect } from 'react';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left border-b-2 border-gray-300">ID</th>
            <th className="py-3 px-6 text-left border-b-2 border-gray-300">Product Name</th>
            <th className="py-3 px-6 text-left border-b-2 border-gray-300">Product Brand</th>
            <th className="py-3 px-6 text-left border-b-2 border-gray-300">Product Owner</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="py-4 px-6 border-b border-gray-200">{product.id}</td>
              <td className="py-4 px-6 border-b border-gray-200">{product.product_name}</td>
              <td className="py-4 px-6 border-b border-gray-200">{product.product_brand}</td>
              <td className="py-4 px-6 border-b border-gray-200">{product.owner_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;