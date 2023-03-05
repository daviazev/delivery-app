import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import AdministratorProducts from './pages/AdministratorProducts';
// import SellerProducts from './pages/SellerOrders';
import Cart from './pages/Cart';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import SellerOrders from './pages/SellerOrders';
import SellerOrderDetails from './pages/SellerOrderDetails';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <CustomerProducts /> } />
        <Route path="/administrator/products" element={ <AdministratorProducts /> } />
        {/* <Route path="/seller/products" element={ <SellerProducts /> } /> */}
        <Route path="/seller/orders" element={ <SellerOrders /> } />
        <Route path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
        <Route path="/customer/checkout" element={ <Cart /> } />
        <Route path="/customer/orders/:id" element={ <Details /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </Router>
  );
}
