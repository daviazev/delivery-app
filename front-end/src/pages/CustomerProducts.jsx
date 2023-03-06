import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../axios/config';

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <Navbar />
      <section>
        {products.map(({ id, name, price, urlImage }, index) => (
          <section key={ index }>
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
              onClick={ () => decrement(id) }
            >
              REMOVER
            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${id}` }
              type="number"
              name={ `input${index}` }
              defaultValue="0"
              min="0"
              onChange={ ({ target: { value } }) => handleChange(id, Number(value)) }
            />
            <button
              data-testid={ `customer_products__button-card-add-item-${id}` }
              type="button"
              onClick={ () => increment(id) }
            >
              ADICIONAR
            </button>
          </section>
        ))}
      </section>
    </div>
  );
}
