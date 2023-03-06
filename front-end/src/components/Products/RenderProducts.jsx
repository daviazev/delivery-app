import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function RenderProducts(
  { name, urlImage, price, id, setSubTotal, subTotal,
    localStorageProducts, setLocalStorageProducts, setInLocalStorage },
) {
  const [quantity, setQuantity] = useState(0);

  const increment = (value, productId) => {
    setQuantity(quantity + 1);
    const soma = Number(subTotal) + Number(value);
    setSubTotal(soma.toFixed(2));

    // aproveita a função para adicionar o produto ou aumentar sua quantidade no localStorage
    const product = { name, price, id, quantity: quantity + 1 };
    const existingProducts = localStorageProducts.find((p) => p.id === productId);

    if (existingProducts) existingProducts.quantity += 1;
    else localStorageProducts.push(product);

    setLocalStorageProducts([...localStorageProducts]);

    setInLocalStorage([...localStorageProducts]);
  };

  // aproveita a função para remover o produto ou diminuir sua quantidade no localStorage
  const decrement = (value, productId) => {
    if (quantity <= 0) {
      return 0;
    }

    setQuantity(quantity - 1);
    const sub = Number(subTotal) - Number(value);
    setSubTotal(sub.toFixed(2));

    const existingProducts = localStorageProducts.find((p) => p.id === productId);
    if (existingProducts) existingProducts.quantity -= 1;

    if (existingProducts.quantity === 0) {
      const storage = JSON.parse(localStorage.getItem('products'));
      const removeProduct = storage.filter((element) => element.id !== productId);
      return setLocalStorageProducts([...removeProduct]);
    }

    setLocalStorageProducts([...localStorageProducts]);

    setInLocalStorage([...localStorageProducts]);
  };

  // aproveita a função para adicionar o produto ou aumentar sua quantidade no localStorage
  // usando o valor inserido pelo o usuário

  const inputChange = (event, valuePrice, productId) => {
    const { value } = event.target;
    const soma = Number(subTotal) + Number(valuePrice) * Number(value);
    const toFixed2 = soma.toFixed(2);
    setQuantity(value);
    setSubTotal(String(toFixed2));

    const existingProducts = localStorageProducts.find((p) => p.id === productId);

    if (existingProducts) {
      existingProducts.quantity = Number(value);
    } else {
      const newProduct = {
        name,
        price: valuePrice,
        id: productId,
        quantity: Number(value),
      };
      localStorageProducts.push(newProduct);
    }

    setLocalStorageProducts([...localStorageProducts]);
  };

  return (
    <div>
      <h3
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}

      </h3>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        alt={ name }
        src={ urlImage }
        width="100px"
      />
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }

      </p>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => decrement(price, id) }
      >
        REMOVER
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        value={ quantity }
        onChange={ (event) => inputChange(event, price, id) }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => increment(price, id) }
      >
        ADICIONAR
      </button>
    </div>
  );
}

RenderProducts.propTypes = {
  name: PropTypes.string,
  urlImage: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
}.isRequired;
