import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api, { setToken } from '../axios/config';
import Loading from '../components/Loading';
import Table from '../components/OrderDetails/Table';
import '../styles/details.css';

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
          <Table
            status={ status }
            handleStatus={ handleStatus }
            sellerName={ sellerName }
            id={ id }
            apiResult={ apiResult }
          />
        </section>
      )}
    </section>
  );
}
