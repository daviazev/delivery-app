import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { checkEmailAndPassword } from '../utils/checkUser';
import loginApi from '../axios/config';
// import '../styles/login.css';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [isDisable, setIsDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = ({ target: { name, value } }) => {
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

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
    console.log('Logou', user);
    try {
      const result = await loginApi.post('/login', user);
      console.log('Usuario logado');
      console.log(result);
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  const navigate = useNavigate();

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
          data-testid="common_login__input-email"
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={ handleChange }
          data-testid="common_login__input-password"
        />
        <button
          className="loginBtn"
          type="submit"
          disabled={ isDisable }
          data-testid="common_login__button-login"
        >
          Login
        </button>
        <button
          className="link"
          type="submit"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
      <span
        className="loginError"
        data-testid="common_login__element-invalid-email"
      >
        {errorMessage}
      </span>
    </section>
  );
}
