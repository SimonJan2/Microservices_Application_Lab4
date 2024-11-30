import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_ORDER_SERVICE}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PRODUCT_SERVICE}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_ORDER_SERVICE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '1', // Hardcoded for demo
          products: selectedProducts
        })
      });
      if (response.ok) {
        setSelectedProducts([]);
        fetchOrders();
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => {
            const product = products.find(p => p.id === e.target.value);
            if (product) {
              setSelectedProducts([...selectedProducts, {...product, quantity: 1}]);
            }
          }}
        >
          <option value="">Select Product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <button 
          onClick={createOrder}
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={selectedProducts.length === 0}
        >
          Create Order
        </button>
      </div>
      <div className="space-y-2">
        {orders.map(order => (
          <div key={order.id} className="border p-2 rounded">
            <div>Order #{order.id}</div>
            <div>Status: {order.status}</div>
            <div>Total: ${order.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;