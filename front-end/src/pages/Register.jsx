import React, { useEffect, useState } from 'react';
import { checkEmailAndPassword, checkUser } from '../utils/checkUser';
// import '../styles/register.css';

export default function Register() {
  const [user, setUser] = useState({ email: '', username: '', password: '' });
  const [isDisable, setIsDisable] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const register = (event) => {
    event.preventDefault();
    console.log('Registrou');
  };

  useEffect(() => {
    const validateForm = () => {
      const { email, password, username } = user;
      const check1 = Object.values(user).every((key) => key);
      const check2 = checkEmailAndPassword(email, password);
      const check3 = checkUser(username);
      if (check1 && check2 && check3) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    };
    validateForm();
  }, [user]);

  return (
    <section>
      <h1 className="app">Cadastro</h1>
      <form className="registerForm" onSubmit={ register }>
        <input
          className="inputRegister"
          type="text"
          name="username"
          placeholder="Seu Nome"
          onChange={ handleChange }
          value={ user.username }
          data-testid="common_register__input-name"
        />
        <input
          className="inputRegister"
          type="email"
          name="email"
          placeholder="Email"
          value={ user.email }
          onChange={ handleChange }
          data-testid="common_register__input-email"
        />
        <input
          className="inputRegister"
          type="password"
          name="password"
          placeholder="**********"
          onChange={ handleChange }
          value={ user.password }
          data-testid="common_register__input-password"
        />
        <button
          type="submit"
          className="registerBtn"
          disabled={ isDisable }
          data-testid="common_register__button-register"
        >
          Cadastrar
        </button>
      </form>
      <span
        className="registerError"
        data-testid="common_login__element-invalid-email"
      >
        Error Message
      </span>
    </section>

  );
}
