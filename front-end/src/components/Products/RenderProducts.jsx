import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function RenderProducts(
  { name, urlImage, price, id },
) {
  const [quantity, setQuantity] = useState(0);
  const [newPrice, setNewPrice] = useState(`${price}`);

  console.log(typeof id);

  useEffect(() => {
    if (quantity > 0) {
      setNewPrice(`${(quantity * price).toFixed(2)}`);
    }
  }, [quantity]);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity <= 0) {
      return 0;
    }

    setQuantity(quantity - 1);
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
        { newPrice.replace('.', ',') }

      </p>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ decrement }
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
        onClick={ increment }
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
