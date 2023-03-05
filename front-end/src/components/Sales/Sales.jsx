import React, { useEffect, useState } from 'react';

// import { useNavigate } from 'react-router-dom';

import api from '../../axios/config';
import Loading from '../Loading';

import RenderSales from './RenderSales';

export default function Sales() {
  const [sales, setSales] = useState([]);

  // const navigate = useNavigate();

  useEffect(() => {
    async function getSales() {
      const response = await api.get('/seller/orders');
      console.log('response', response.data);
      setSales(response.data);
    }
    getSales();
  }, []);

  // const sellerOrderDetails = () => {
  //   navigate('/seller/order/:id');
  //   setInLocalStorage();
  // };

  if (sales.length === 0) {
    return <Loading />;
  }

  return (
    <section>
      <div>
        {sales.map(({ id,
          status, saleDate, totalPrice, deliveryAddress, deliveryNumber }, index) => (
          (<RenderSales
            key={ index }
            id={ id }
            status={ status }
            saleDate={ saleDate }
            totalPrice={ totalPrice }
            deliveryAddress={ deliveryAddress }
            deliveryNumber={ deliveryNumber }
          />)
        ))}
      </div>
    </section>
  );
}
