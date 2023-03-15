import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataTestsIds from '../utils/dataTestsIds';
import MobileNavbar from './MobileNavbar';
import '../styles/navbar.css';

export default function Navbar() {
  const [user, setUser] = useState({});
  const [currentUrl, setCurrentUrl] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const MIN_WIDTH = 549;

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    setCurrentUrl(window.location.pathname);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.onresize = handleResize;

    return () => {
      window.onresize = null;
    };
  }, []);

  const { role, name } = user;
  const route = role === 'seller' ? '/seller/orders' : '/customer/orders';
  const productRoute = '/customer/products';

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="header">
      { screenWidth <= MIN_WIDTH ? (
        <MobileNavbar />
      ) : (
        <section className="header">
          <div className="headerDiv">
            <button
              type="button"
              className={ `headerInfo btn 
            ${currentUrl === productRoute ? 'primaryColor' : 'secondColor'}` }
              onClick={ () => navigate('/customer/products') }
              data-testid={ dataTestsIds[11] }
            >
              PRODUTOS
            </button>
            <button
              type="button"
              onClick={ () => navigate(route) }
              className={ `headerInfo btn 
            ${currentUrl === productRoute ? 'secondColor' : 'primaryColor'}` }
              data-testid={ dataTestsIds[12] }
            >
              MEUS PEDIDOS
            </button>
          </div>
          <div className="headerDiv">
            <p
              className="headerInfo username"
              data-testid={ dataTestsIds[13] }
            >
              {name}
            </p>
            <button
              type="button"
              onClick={ logout }
              className="headerInfo logoutBtn btn"
              data-testid={ dataTestsIds[14] }
            >
              SAIR
            </button>
          </div>
        </section>
      )}
    </header>
  );
}
