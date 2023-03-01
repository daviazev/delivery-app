import React, { useEffect, useState } from 'react';
import loginApi from '../axios/config';

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const response = await loginApi.get('/products');
      setProducts(response.data);
    }
    getProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div>
        LOADING...
      </div>
    );
  }

  return (
    <section>
      <h2>PRODUTOS</h2>
      <div>
        {products.map((product) => (
          <div key={ product.id }>
            <h3
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              {product.name}

            </h3>
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              alt={ product.name }
              src={ product.urlImage }
            />
            <p
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              { product.price }

            </p>
            <button
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              type="button"
            >
              REMOVER
            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              type="number"
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              type="button"
            >
              ADICIONAR
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
