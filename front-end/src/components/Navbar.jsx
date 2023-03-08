import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userFromLocal = JSON.parse(localStorage.getItem('user'));
    setUser(userFromLocal);
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header>
      <ul>
        <li data-testid="customer_products__element-navbar-link-products">PRODUTOS</li>
        <li
          data-testid="customer_products__element-navbar-link-orders"
        >
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => navigate('/customer/orders') }
          >
            MEUS PEDIDOS
          </button>
        </li>
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user.name}
        </li>
        <nav>
          <button
            type="button"
            onClick={ () => logout() }
            data-testid="customer_products__element-navbar-link-logout"
          >
            SAIR
          </button>
        </nav>
      </ul>
    </header>
  );
}
