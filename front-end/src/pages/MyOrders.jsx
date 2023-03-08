import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api, { setToken } from '../axios/config';

export default function MyOrders() {
  const [sales, setSalles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const findSalles = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem('user'));
        setToken(token);
        const { data } = await api.get('/seller/orders');
        setSalles(data);
      } catch (error) {
        console.error(error);
      }
    };
    findSalles();
  }, []);

  return (
    <section>
      <Navbar />
      <section>
        {sales.map(({ id, status, saleDate, totalPrice }, index) => (
          <button
            type="button"
            key={ index }
            onClick={ () => navigate(`/customer/orders/${id}`) }
          >
            <div data-testid={ `customer_orders__element-order-id-${id}` }>
              <p>Pedido</p>
              <p>{id}</p>
            </div>
            <span
              data-testid={ `customer_orders__element-delivery-status-${id}` }
            >
              { status }
            </span>
            <div>
              <p
                data-testid={ `customer_orders__element-order-date-${id}` }
              >
                {new Date(saleDate).toLocaleDateString('pt-BR')}

              </p>
              <p
                data-testid={ `customer_orders__element-card-price-${id}` }
              >
                {`R$ ${totalPrice.replace('.', ',')}`}
              </p>
            </div>
          </button>
        ))}
      </section>
    </section>
  );
}
