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
    <div>
      <nav>
        <ul>
          <li data-testid="customer_products__element-navbar-link-products">PRODUTOS</li>
          <li
            data-testid="customer_products__element-navbar-link-orders"
          >
            MEUS PEDIDOS
          </li>
          <li
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {user.name}
          </li>
          <button
            type="button"
            onClick={ () => logout() }
            data-testid="customer_products__element-navbar-link-logout"
          >
            SAIR
          </button>
        </ul>
      </nav>
    </div>
  );
}
