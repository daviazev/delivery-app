import React, { useEffect, useState } from 'react';
import api from '../../axios/config';
import Loading from '../Loading';

import RenderProducts from './RenderProducts';

export default function Products() {
  const [products, setProducts] = useState([]);

  const a = 99.90;

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');
      setProducts(response.data);
    }
    getProducts();
  }, []);

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
          />
        ))}

        <button
          type="button"
          data-testid="customer_products__button-cart"
        >
          <span data-testid="customer_products__checkout-bottom-value">
            {`VER CARRINHO: R$ ${a}`}
          </span>
        </button>
      </div>
    </section>
  );
}
