import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import calcTotalPrice from '../utils/calcTotalPrice';
import api, { setToken } from '../axios/config';
import Loading from '../components/Loading';
import formatDate from '../utils/formatDate';

const dataTestId = 'customer_order_details__element-order-details-label';

export default function Details() {
  const { id } = useParams();
  const [apiResult, setApiResult] = useState({
    products: [],
    seller: [],
    order: {},
  });

  const [isFetching, setIsFinish] = useState(true);
  const [status, setStatus] = useState('');

  const fetchApi = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const saleById = await api.get(`/sales/${id}`);
    const seller = await api.get('/seller', { params: { q: 'seller' } });
    const orderById = await api.get(`/orders/${id}`);

    setApiResult((prevState) => ({ ...prevState,
      products: saleById.data,
      seller: seller.data,
      order: orderById.data,
    }));

    setStatus(orderById.data.status);

    setIsFinish(false);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const changeStatusInDB = async (value) => {
    await api.put(`/seller/orders/${id}`, { status: value });
  };

  const handleStatus = ({ target: { value } }) => {
    setStatus(value);
    changeStatusInDB(value);
  };

  const sellerName = () => {
    if (apiResult.seller.length && apiResult.order) {
      const result = apiResult.seller
        .find((seller) => seller.id === apiResult.order.sellerId);

      if (result) return result.name;
    }
  };

  return (
    <section>
      { isFetching ? (
        <Loading />
      ) : (
        <section>
          <Navbar />
          <h1>Detalhe do pedido</h1>
          <section>
            <strong
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {`Pedido ${id}`}
            </strong>
            <p
              data-testid={ `${dataTestId}-seller-name` }
            >
              {`P. Vend: ${sellerName()}`}
            </p>
            <p
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {formatDate(apiResult.order.saleDate)}
            </p>
            <p
              data-testid={ `${dataTestId}-delivery-status` }
            >
              { status }
            </p>
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              disabled={ status !== 'Em Trânsito' }
              onClick={ (event) => handleStatus(event) }
              value="Entregue"
            >
              MARCAR COMO ENTREGUE

            </button>
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
              {apiResult.products.map(({ name, price, quantity }, i) => (
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
          <div data-testid="customer_order_details__element-order-total-price">
            { apiResult.products.length
          && `Total: R$ ${calcTotalPrice(apiResult.products)}`}
          </div>
        </section>
      )}
    </section>
  );
}
