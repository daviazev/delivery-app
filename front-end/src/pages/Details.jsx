import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import calcTotalPrice from '../utils/calcTotalPrice';

export default function Details() {
  const [products, setProducts] = useState([]);

  useEffect(() => setProducts(JSON.parse(localStorage.getItem('products'))), []);

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
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ name, price, quantity }, i) => (
            <tr key={ i }>
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                {name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {quantity}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                {`R$ ${Number(price).toFixed(2).replace('.', ',')}`}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {`R$ ${(Number(price) * Number(quantity)).toFixed(2).replace('.', ',')}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      { products.length && `Total: R$ ${calcTotalPrice(products)}`}
    </section>
  );
}
