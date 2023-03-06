import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import calcTotalPrice from '../utils/calcTotalPrice';
import api from '../axios/config';
import Loading from '../components/Loading';

export default function Details() {
  const { id } = useParams();
  const [salles, setSalles] = useState([]);
  const [isFetching, setIsFinish] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get(`/sales/${id}`);
        setSalles(data);
        setIsFinish(false);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, []);

  return (
    <section>
      { isFetching ? (
        <Loading />
      ) : (
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
              {salles.map(({ name, price, quantity }, i) => (
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
                    {name}
                  </td>
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
                    {`R$ ${Number(price).toFixed(2).replace('.', ',')}`}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${i}`
                    }
                  >
                    {`R$ ${(Number(price) * Number(quantity))
                      .toFixed(2).replace('.', ',')}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          { salles.length && `Total: R$ ${calcTotalPrice(salles)}`}
        </section>
      )}
    </section>
  );
}
