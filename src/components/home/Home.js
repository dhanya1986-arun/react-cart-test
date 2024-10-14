import React, { useEffect, useState } from 'react';
import './Home.css';

const API_URL = 'https://dev-project-ecommerce.upgrad.dev/api/';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${API_URL}products`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <h1>Welcome to upGrad Eshop</h1>
      <p>Your one-stop shop for all things e-commerce!</p>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
