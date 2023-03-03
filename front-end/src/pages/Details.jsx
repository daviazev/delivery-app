import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import calcTotalPrice from '../utils/calcTotalPrice';

export default function Details() {
  const [arrMock, setArrMock] = useState([]);

  useEffect(() => setArrMock(JSON.parse(localStorage.getItem('mock'))), []);

  return (
    <section>
      <Navbar />
      <h1>Detalhe do pedido</h1>
      <section>
        <strong>Pedido 0003;</strong>
        <p>P. Vend: Fulana Pereira</p>
        <p>07/04/2021</p>
        <span>ENTREGUE</span>
        <button type="button">MARCAR COMO ENTREGUE</button>
      </section>
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Produto</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {arrMock.map(({ product, description, quantity, price }, i) => (
            <tr key={ i }>
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                {product}
              </td>
              <td>{description}</td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {quantity}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                {`R$ ${price.toFixed(2).replace('.', ',')}`}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {`R$ ${(price * quantity).toFixed(2).replace('.', ',')}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      { arrMock.length && `Total: R$ ${calcTotalPrice(arrMock)}`}
    </section>
  );
}
