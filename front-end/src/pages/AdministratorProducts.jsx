import React, { useState, useEffect } from 'react';
import { checkEmailAndPassword, checkUser } from '../utils/checkUser';
import api, { setToken } from '../axios/config';

export default function AdministratorProducts() {
  const [user, setUser] = useState({
    email: '', name: '', password: '', role: 'seller',
  });
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'role') {
      if (value === 'Cliente') {
        return setUser((prevState) => ({ ...prevState, [name]: 'customer' }));
      } if (value === 'Administrador') {
        return setUser((prevState) => ({ ...prevState, [name]: 'administrator' }));
      }
      return setUser((prevState) => ({ ...prevState, [name]: 'seller' }));
    }

    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
  }, []);

  useEffect(() => {
    const { email, password, name } = user;
    const checkPasswordAndEmail = checkEmailAndPassword(email, password);
    const checkName = checkUser(name);

    if (checkName && checkPasswordAndEmail) setIsDisable(false);
    else { setIsDisable(true); }
  }, [user]);

  const postUser = async () => {
    // event.preventDefault();
    try {
      const { data } = await api.post('/admin/manage', user);
      console.log(data);
    } catch (error) {
      const { data: { message } } = error.response;
      setErrorMessage(message);
    }
  };

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
        onClick={ postUser }
      >
        CADASTRAR

      </button>
      <span data-testid="admin_manage__element-invalid-register">{errorMessage}</span>
    </div>
  );
}
