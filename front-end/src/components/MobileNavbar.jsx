import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/mobileNavbar.css';

export default function MobileNavbar() {
  const [user, setUser] = useState({});
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const { role, name } = user;
  const route = role === 'seller' ? '/seller/orders' : '/customer/orders';

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <button
        type="button"
        onClick={ () => setIsActive(!isActive) }
        className={ `menu-icon ${isActive ? 'active' : 'inactive'}` }
      >
        <span className="icon" />
        <span className="icon" />
        <span className="icon" />
      </button>
      <ul className="menu" style={ { left: isActive ? '0' : '-50vw' } }>
        <li>
          <a href="/customer/products">PRODUTOS</a>
        </li>
        <li>
          <a href={ route }>MEUS PEDIDOS</a>
        </li>
        <li>
          <p className="mobileUsername">{name}</p>
        </li>
        <li>
          <button
            type="button"
            onClick={ logout }
            className="mobileLogoutBtn"
          >
            SAIR
          </button>
        </li>
      </ul>
    </nav>
  );
}
