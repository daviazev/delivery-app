import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmailAndPassword } from '../utils/checkUser';
import loginApi, { setToken } from '../axios/config';
// import '../styles/login.css';

import dataTestsIds from '../utils/dataTestsIds';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const translate = {
    administrator: '/admin/manage',
    seller: '/seller/orders',
    customer: '/customer/products',
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('user'));
    if (local) navigate('/customer/products');
  }, []);

  useEffect(() => {
    const validateForm = () => {
      const { email, password } = user;
      if (checkEmailAndPassword(email, password)) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    };
    validateForm();
  }, [user]);

  const login = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginApi.post('/login', user);
      setToken(data.token);
      const { id, ...userInfo } = data;
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('userId', JSON.stringify(id));
      navigate(translate[data.role]);
    } catch ({ response: { data: { message } } }) {
      setErrorMessage(message);
    }
  };

  return (
    <section>
      <h1 className="app">App Delivery</h1>
      <form className="form" onSubmit={ login }>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={ handleChange }
          data-testid={ dataTestsIds[1] }
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={ handleChange }
          data-testid={ dataTestsIds[2] }
        />
        <button
          className="loginBtn"
          type="submit"
          disabled={ isDisable }
          data-testid={ dataTestsIds[3] }
        >
          Login
        </button>
        <button
          className="link"
          type="submit"
          data-testid={ dataTestsIds[4] }
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
      <span
        className="loginError"
        data-testid={ dataTestsIds[5] }
      >
        {errorMessage}
      </span>
    </section>
  );
}
