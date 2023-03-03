import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import AdministratorProducts from './pages/AdministratorProducts';
import SellerProducts from './pages/SellerProducts';
import Cart from './pages/Cart';
import Details from './pages/Details';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <CustomerProducts /> } />
        <Route path="/admin/manage" element={ <AdministratorProducts /> } />
        <Route path="/seller/products" element={ <SellerProducts /> } />
        <Route path="/customer/checkout" element={ <Cart /> } />
        <Route path="/customer/orders/:id" element={ <Details /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </Router>
  );
}
