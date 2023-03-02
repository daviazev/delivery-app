import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function RenderProducts(
  { name, urlImage, price, id, setSubTotal, subTotal },
) {
  const [quantity, setQuantity] = useState(0);

  const increment = (value) => {
    setQuantity(quantity + 1);
    const soma = Number(subTotal) + Number(value);
    setSubTotal(soma.toFixed(2));
  };

  const decrement = (value) => {
    if (quantity <= 0) {
      return 0;
    }

    setQuantity(quantity - 1);
    const sub = Number(subTotal) - Number(value);
    setSubTotal(sub.toFixed(2));
  };

  const inputChange = ({ target }) => {
    setQuantity(Number(target.value));
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
        onClick={ () => decrement(price) }
      >
        REMOVER
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        value={ quantity }
        onChange={ inputChange }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => increment(price) }
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
