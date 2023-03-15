import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../axios/config';
import dataTestsIds from '../utils/dataTestsIds';
import '../styles/products.css';

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
      <section className="productsSection">
        {products.map(({ id, name, price, urlImage, quantity }, index) => (
          <section key={ index } className="productsCard">
            <figure className="imgCard">
              <img
                data-testid={ `${dataTestsIds[17]}${id}` }
                alt={ name }
                src={ urlImage }
                className="productImg"
              />
              <p
                data-testid={ `${dataTestsIds[16]}${id}` }
                className="productPrice"
              >
                { `R$ ${price.replace('.', ',')}` }

              </p>
            </figure>
            <div className="cardFooter">
              <h3
                data-testid={ `${dataTestsIds[15]}${id}` }
                className="productName"
              >
                {name}
              </h3>
              <div className="cardFooterDiv">
                <button
                  data-testid={ `${dataTestsIds[19]}${id}` }
                  type="button"
                  onClick={ () => decrement(id) }
                  className="quantityBtn"
                >
                  -
                </button>
                <input
                  data-testid={ `${dataTestsIds[20]}${id}` }
                  type="number"
                  name={ `input${index}` }
                  value={ quantity }
                  min="0"
                  onChange={ ({ target: { value } }) => handleChange(id, Number(value)) }
                  className="quantityInput"
                />
                <button
                  data-testid={ `${dataTestsIds[18]}${id}` }
                  type="button"
                  onClick={ () => increment(id) }
                  className="quantityBtn"
                >
                  +
                </button>
              </div>
            </div>
          </section>
        ))}
        <button
          type="button"
          data-testid={ `${dataTestsIds[21]}` }
          onClick={ () => navigate('/customer/checkout') }
          disabled={ isDisabled }
          className="cartBtn"
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
