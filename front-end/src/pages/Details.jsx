import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import calcTotalPrice from '../utils/calcTotalPrice';
import api, { setToken } from '../axios/config';
import Loading from '../components/Loading';

export default function Details() {
  const { id } = useParams();
  const [apiResult, setApiResult] = useState({
    products: [],
    seller: [],
    order: {},
  });
  const [isFetching, setIsFinish] = useState(true);

  const sellerId = JSON.parse(localStorage.getItem('sellerId'));

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get(`/sales/${id}`);
        setApiResult((prevState) => ({ ...prevState, products: data }));
        setIsFinish(false);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();

    const getSellerName = async () => {
      try {
        const { data } = await api.get('/seller', { params: { q: 'seller' } });
        setApiResult((prevState) => ({ ...prevState, seller: data }));
      } catch (error) {
        console.log(error);
      }
    };
    getSellerName();

    const test = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        setToken(token);
        const { data } = await api.get(`/orders/${id}`);
        setApiResult((prevState) => ({ ...prevState, order: data }));
      } catch (error) {
        console.error(error);
      }
    };
    test();
  }, []);

  const sellerName = () => {
    if (apiResult.seller.length) {
      const { name } = apiResult.seller.find((seller) => seller.id === sellerId);
      return name;
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
            <p>
              {`P. Vend: ${sellerName()}`}
            </p>
            <p>{new Date(apiResult.order.saleDate).toLocaleDateString('pt-BR')}</p>
            <span>{apiResult.order.status}</span>
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
          { apiResult.products.length
          && `Total: R$ ${calcTotalPrice(apiResult.products)}`}
        </section>
      )}
    </section>
  );
}
