import React, { useState, useEffect } from 'react';
import Countdown from '../components/Countdown';
import Navbar from '../components/Navbar';
import calcTotalPrice from '../utils/calcTotalPrice';
import api from '../axios/config';
import '../styles/cart.css';

export default function Cart() {
  const [arrMock, setArrMock] = useState([
    {
      product: 'cerveja',
      description: 'bebida alcolica',
      quantity: 123,
      price: 99,
    },
    {
      product: 'guanara',
      description: 'bebida gaseficada',
      quantity: 13,
      price: 10,
    },
    {
      product: 'agua',
      description: 'liquido normal',
      quantity: 1000,
      price: 2.50,
    },
  ]);

  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => localStorage.setItem('mock', JSON.stringify(arrMock)), []);

  const removeProduct = (index) => {
    const arrTest = [...arrMock];
    arrTest.splice(index, 1);
    setArrMock(arrTest);
  };

  const finishPurchase = async (event) => {
    event.preventDefault();
    setIsFinish(true);
    console.log('API');
    const result = await api.post('/products', arrMock);
    console.log(result);
  };

  return (
    <section>
      { isFinish ? (
        <Countdown />
      ) : (
        <section>
          <Navbar />
          <h1>Finalizar Pedido</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Produto</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-total</th>
                <th>Remover Item</th>
              </tr>
            </thead>
            <tbody>
              {arrMock.map(({ product, description, quantity, price }, i) => (
                <tr key={ i }>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${i}`
                    }
                  >
                    {i + 1}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-name-${i}`
                    }
                  >
                    {product}
                  </td>
                  <td>{description}</td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${i}`
                    }
                  >
                    {quantity}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${i}`
                    }
                  >
                    {`R$ ${price.toFixed(2).replace('.', ',')}`}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${i}`
                    }
                  >
                    {`R$ ${(price * quantity).toFixed(2).replace('.', ',')}`}
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid={
                        `customer_checkout__element-order-table-remove-${i}`
                      }
                      onClick={ () => removeProduct(i) }
                    >
                      Remover

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1
            data-testid="customer_checkout__element-order-total-price"
          >
            { arrMock.length && `Total: R$ ${calcTotalPrice(arrMock)}`}
          </h1>
          <h2>Detalhes e Endereço para Entrega</h2>
          <form onSubmit={ finishPurchase }>
            <label htmlFor="select">
              P. Vendedora Responsável:
              <select
                id="select"
                data-testid="customer_checkout__select-seller"
              >
                <option>Fulana Pereira</option>
              </select>
            </label>
            <label htmlFor="address">
              Endereço
              <input
                type="text"
                id="address"
                placeholder="Digite seu Endereço"
                data-testid="customer_checkout__input-address"
              />
            </label>
            <label htmlFor="houseNumber">
              Número
              <input
                type="number"
                id="houseNumber"
                data-testid="customer_checkout__input-address-number"
              />
            </label>
            <button
              type="submit"
              data-testid="customer_checkout__button-submit-order"
            >
              FINALIZAR PRODUTO
            </button>
          </form>
        </section>
      )}
    </section>
  );
}
