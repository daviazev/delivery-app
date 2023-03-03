import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../../axios/config';
import Loading from '../Loading';

import RenderProducts from './RenderProducts';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [isDisable, setIsDisable] = useState(true);
  const [localStorageProducts, setLocalStorageProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(localStorageProducts));
  }, []);

  const navigate = useNavigate();

  const setInLocalStorage = () => {
    localStorage.setItem('products', JSON.stringify(localStorageProducts));
  };

  useEffect(() => {
    setIsDisable(Number(subTotal) === 0);
  }, [subTotal]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');
      setProducts(response.data);
    }
    getProducts();
  }, []);

  const customerCheckout = () => {
    navigate('/customer/checkout');
    setInLocalStorage();
  };

  if (products.length === 0) {
    return <Loading />;
  }

  return (
    <section>
      <h2>PRODUTOS</h2>
      <div>
        {products.map(({ id, name, urlImage, price }, index) => (
          <RenderProducts
            key={ index }
            id={ id }
            name={ name }
            urlImage={ urlImage }
            price={ price }
            subTotal={ subTotal }
            setSubTotal={ setSubTotal }
            localStorageProducts={ localStorageProducts }
            setLocalStorageProducts={ setLocalStorageProducts }
          />
        ))}

        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => customerCheckout() }
          disabled={ isDisable }
        >
          VER CARRINHO: R$
          {' '}
          <span data-testid="customer_products__checkout-bottom-value">
            {subTotal && `${subTotal?.replace('.', ',')}`}
          </span>
        </button>
      </div>
    </section>
  );
}
