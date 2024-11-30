import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import Orders from './components/Orders';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg mb-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-gray-900">Products</Link>
              <Link to="/orders" className="text-gray-700 hover:text-gray-900">Orders</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-gray-900">Register</Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login isRegister={true} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
};

const Home = () => (
  <div className="text-center">
    <h1 className="text-3xl font-bold mb-4">Welcome to Microservices Demo</h1>
    <p className="text-gray-600">This is a demonstration of a microservices architecture using Flask and React.</p>
  </div>
);

export default App;