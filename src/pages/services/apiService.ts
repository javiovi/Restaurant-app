import axios from 'axios';


export const fetchProducts = async (page: number) => {
  const response = await axios.get(`/api/products?page=${page}`);
  console.log("Response Data:", response.data); 
  return response.data; 
};


export const createOrder = async (order: { products: number[]; totalPrice: number }) => {
  const response = await axios.post('/api/orders', order);
  return response.data;
};
