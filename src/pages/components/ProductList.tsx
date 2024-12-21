import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/apiService';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Restaurant {
  id: number;
  name: string;
  products: Product[];
}

const ProductList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(page);
      console.log("API Response:", data);
      if (data && Array.isArray(data.restaurants)) {
        setRestaurants((prev) => [...prev, ...data.restaurants]);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          <ul>
            {restaurant.products.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ProductList;
