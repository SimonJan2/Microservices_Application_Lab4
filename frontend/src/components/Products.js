import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PRODUCT_SERVICE}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const addProduct = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PRODUCT_SERVICE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (response.ok) {
        setNewProduct({ name: '', price: '', stock: '' });
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded mb-2"
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded mb-2"
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
        />
        <input
          type="number"
          placeholder="Stock"
          className="w-full p-2 border rounded mb-2"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
        />
        <button 
          onClick={addProduct}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Add Product
        </button>
      </div>
      <div className="space-y-2">
        {products.map(product => (
          <div key={product.id} className="border p-2 rounded">
            <div>{product.name}</div>
            <div>Price: ${product.price}</div>
            <div>Stock: {product.stock}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;