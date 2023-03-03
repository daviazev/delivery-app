import React from 'react';

export default function AdministratorProducts() {
  return (
    <div>
      <nav>
        <ul>
          <li
            data-testid="customer_products__element-navbar-link-orders"
          >
            GERENCIAR USUÁRIOS

          </li>
          <li
            data-testid="customer_products__element-navbar-user-full-name"
          >
            NOME DO USUÁRIO

          </li>
          <li data-testid="customer_products__element-navbar-link-logout">SAIR</li>
        </ul>
      </nav>
      <section>
        <input
          data-testid="admin_manage__input-name"
          type="text"
        />
        <input
          type="email"
          data-testid="admin_manage__input-email"
        />
        <input
          type="password"
          data-testid="admin_manage__input-password"
        />
        <select data-testid="admin_manage__select-role">
          <option>Vendedor</option>
          <option>Cliente</option>
          <option>Administrador</option>
        </select>
      </section>
      <button
        type="button"
        data-testid="admin_manage__button-register"
      >
        CADASTRAR

      </button>
    </div>
  );
}
