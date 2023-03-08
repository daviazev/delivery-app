import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import AdministratorProducts from './pages/AdministratorProducts';
import Cart from './pages/Cart';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import SellerOrders from './pages/SellerOrders';
import SellerOrderDetails from './pages/SellerOrderDetails';
import MyOrders from './pages/MyOrders';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <CustomerProducts /> } />
        <Route path="/admin/manage" element={ <AdministratorProducts /> } />
        <Route path="/seller/orders" element={ <SellerOrders /> } />
        <Route exact path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
        <Route path="/customer/checkout" element={ <Cart /> } />
        <Route path="/customer/orders/:id" element={ <Details /> } />
        <Route path="/customer/orders" element={ <MyOrders /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </Router>
  );
}
