import React, { useEffect } from 'react';
import { setToken } from '../axios/config';
import Navbar from '../components/Navbar';
import Sales from '../components/Sales/Sales';

export default function SellerOrders() {
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
  }, []);

  return (
    <div>
      <Navbar />
      <Sales />
    </div>
  );
}
