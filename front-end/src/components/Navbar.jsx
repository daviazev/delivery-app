import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataTestsIds from '../utils/dataTestsIds';

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
        <a
          href="/customer/products"
        >
          <li data-testid={ dataTestsIds[11] }>PRODUTOS</li>
        </a>
        <a
          href={ user.role === 'seller' ? '/seller/orders' : '/customer/orders' }
        >
          <li
            data-testid={ dataTestsIds[12] }
          >
            <button
              type="button"
              onClick={ () => navigate() }
              data-testid={ dataTestsIds[12] }
            >
              MEUS PEDIDOS
            </button>
          </li>
        </a>
        <li
          data-testid={ dataTestsIds[13] }
        >
          {user.name}
        </li>
        <nav>
          <button
            type="button"
            onClick={ () => logout() }
            data-testid={ dataTestsIds[14] }
          >
            SAIR
          </button>
        </nav>
      </ul>
    </header>
  );
}
