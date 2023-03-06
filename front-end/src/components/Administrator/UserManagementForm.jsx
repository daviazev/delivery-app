import React, { useState, useEffect } from 'react';
import { checkEmailAndPassword, checkUser } from '../../utils/checkUser';
import api from '../../axios/config';

export default function UserManagementForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkPasswordAndEmail = checkEmailAndPassword(email, password);
    const checkName = checkUser(name);

    if (checkName && checkPasswordAndEmail) setIsDisabled(false);
    else { setIsDisabled(true); }
  }, [name, email, password, role]);

  const registerUser = async () => {
    const user = { name, email, password, role };
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
          onChange={ (e) => setName(e.target.value) }
          placeholder="Nome e sobrenome"
          name="name"
        />
        <input
          type="email"
          data-testid="admin_manage__input-email"
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Email"
          name="email"
        />
        <input
          type="password"
          data-testid="admin_manage__input-password"
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="password"
          name="password"
        />
        <select
          value={ role }
          onChange={ (e) => setRole(e.target.value) }
          data-testid="admin_manage__select-role"
          name="role"
        >
          <option value="seller">Vendedor</option>
          <option value="customer">Cliente</option>
          <option value="administrator">Administrador</option>
        </select>
      </section>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        disabled={ isDisabled }
        onClick={ registerUser }
      >
        CADASTRAR

      </button>
      <span data-testid="admin_manage__element-invalid-register">{errorMessage}</span>
    </div>
  );
}
