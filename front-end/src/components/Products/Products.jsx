import React, { useEffect, useState } from 'react';
import api from '../../axios/config';
import Loading from '../Loading';

import RenderProducts from './RenderProducts';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

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
            subTotal={ subTotal }
            setSubTotal={ setSubTotal }
          />
        ))}

        <button
          type="button"
          data-testid="customer_products__button-cart"
        >
          VER CARRINHO: R$
          {' '}
          <span data-testid="customer_products__checkout-bottom-value">
            {`${subTotal.replace('.', ',')}`}
          </span>
        </button>
      </div>
    </section>
  );
}
