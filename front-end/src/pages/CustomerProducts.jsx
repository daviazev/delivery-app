import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../axios/config';
import dataTestsIds from '../utils/dataTestsIds';

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      const { data } = await api.get('/products');
      setProducts(data.map((allData) => ({ ...allData, quantity: 0 })));
    }
    getProducts();
  }, []);

  useEffect(() => {
    function setProductsOnLocalStorage() {
      const filteredProducts = products.filter(({ quantity }) => quantity > 0);
      localStorage.setItem('products', JSON.stringify(filteredProducts));
      setIsDisabled(!products.some(({ quantity }) => quantity > 0));
    }
    setProductsOnLocalStorage();
  }, [products]);

  const handleChange = (id, value) => {
    setProducts((prevProducts) => prevProducts.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: value };
      }
      return product;
    }));
  };

  const decrement = (id) => {
    setProducts((prevProducts) => prevProducts.map((product) => {
      if (product.id === id && product.quantity > 0) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    }));
  };

  const increment = (id) => {
    setProducts((prevProducts) => prevProducts.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    }));
  };

  const calcProducts = () => products.map(({ quantity, price }) => (
    Number(quantity) * Number(price)
  )).reduce((acc, curr) => acc + curr, 0);

  return (
    <section>
      <Navbar />
      <section>
        {products.map(({ id, name, price, urlImage, quantity }, index) => (
          <section key={ index }>
            <h3
              data-testid={ `${dataTestsIds[15]}${id}` }
            >
              {name}

            </h3>
            <img
              data-testid={ `${dataTestsIds[17]}${id}` }
              alt={ name }
              src={ urlImage }
              width="100px"
            />
            <p
              data-testid={ `${dataTestsIds[16]}${id}` }
            >
              { price.replace('.', ',') }

            </p>
            <button
              data-testid={ `${dataTestsIds[19]}${id}` }
              type="button"
              onClick={ () => decrement(id) }
            >
              REMOVER
            </button>
            <input
              data-testid={ `${dataTestsIds[20]}${id}` }
              type="number"
              name={ `input${index}` }
              value={ quantity }
              min="0"
              onChange={ ({ target: { value } }) => handleChange(id, Number(value)) }
            />
            <button
              data-testid={ `${dataTestsIds[18]}${id}` }
              type="button"
              onClick={ () => increment(id) }
            >
              ADICIONAR
            </button>
          </section>
        ))}
        <button
          type="button"
          data-testid={ `${dataTestsIds[21]}` }
          onClick={ () => navigate('/customer/checkout') }
          disabled={ isDisabled }
        >
          VER CARRINHO: R$
          {' '}
          <span data-testid={ `${dataTestsIds[22]}` }>
            {calcProducts().toFixed(2).replace('.', ',')}
          </span>
        </button>
      </section>
    </section>
  );
}
