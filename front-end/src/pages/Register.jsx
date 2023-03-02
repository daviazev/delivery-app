import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmailAndPassword, checkUser } from '../utils/checkUser';
import loginApi from '../axios/config';
// import '../styles/register.css';

export default function Register() {
  const [user, setUser] = useState({ email: '', name: '', password: '' });
  const [isDisable, setIsDisable] = useState(true);
  const [isVisible, setIsVisible] = useState('hidden');

  const translate = {
    administrator: '/administrator/products',
    seller: '/seller/products',
    customer: '/customer/products',
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginApi.post('/register', user);
      localStorage.setItem('user', JSON.stringify(data));
      navigate(translate[data.role]);
    } catch (error) {
      console.error(error);
      setIsVisible('visible');
    }
  };

  useEffect(() => {
    const validateForm = () => {
      const { email, password, name } = user;
      const check1 = Object.values(user).every((key) => key);
      const check2 = checkEmailAndPassword(email, password);
      const check3 = checkUser(name);
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
          name="name"
          placeholder="Seu Nome"
          onChange={ handleChange }
          value={ user.name }
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
        data-testid="common_register__element-invalid_register"
        style={ { visibility: isVisible } }
      >
        User already exists
      </span>
    </section>

  );
}
