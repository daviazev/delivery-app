import React from 'react';

export default function Navbar() {
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
          <li data-testid="customer_products__element-navbar-user-full-name">NOME</li>
          <li data-testid="customer_products__element-navbar-link-logout">SAIR</li>
        </ul>
      </nav>
    </div>
  );
}
