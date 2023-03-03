import React, { useState, useEffect } from 'react';
import { checkEmailAndPassword, checkUser } from '../utils/checkUser';

export default function AdministratorProducts() {
  const [user, setUser] = useState({ email: '', name: '', password: '', role: '' });
  const [isDisable, setIsDisable] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const { email, password, name } = user;
    const checkPasswordAndEmail = checkEmailAndPassword(email, password);
    const checkName = checkUser(name);

    if (checkName && checkPasswordAndEmail) setIsDisable(false);
    else { setIsDisable(true); }
  }, [user]);

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
          onChange={ handleChange }
          placeholder="Nome e sobrenome"
          name="name"
        />
        <input
          type="email"
          data-testid="admin_manage__input-email"
          onChange={ handleChange }
          placeholder="Email"
          name="email"
        />
        <input
          type="password"
          data-testid="admin_manage__input-password"
          onChange={ handleChange }
          placeholder="password"
          name="password"
        />
        <select
          onChange={ handleChange }
          data-testid="admin_manage__select-role"
          name="role"
        >
          <option>Vendedor</option>
          <option>Cliente</option>
          <option>Administrador</option>
        </select>
      </section>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        disabled={ isDisable }
      >
        CADASTRAR

      </button>
    </div>
  );
}
