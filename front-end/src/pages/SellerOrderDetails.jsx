import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api, { setToken } from '../axios/config';
import Loading from '../components/Loading';
import formatDate from '../utils/formatDate';
import dataTestsIds from '../utils/dataTestsIds';

export default function SellerOrderDetails() {
  const { id } = useParams();
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');
  const [saleDate, setSaleDate] = useState('');

  const [preparing, setPreparing] = useState(true);
  const [inTransit, setInTrasit] = useState(false);

  const thArr = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
  ];

  useEffect(() => {
    const getSaleDetails = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      setToken(token);
      try {
        const { data } = await api.get(`/seller/orders/${id}`);
        setTotal(data.sale.totalPrice);
        setStatus(data.sale.status);
        setSaleDate(data.sale.saleDate);
        setSales(data.products);

        setPreparing(data.sale.status === 'Pendente' || data.sale.status === 'Entregue');
        setInTrasit(data.sale.status === 'Preparando' || data.sale.status === 'Entregue');

        if (data.sale.status === 'Em Trânsito') {
          setInTrasit(true);
          setPreparing(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSaleDetails();
  }, []);

  const changeStatusInDB = async (value) => {
    await api.put(`/seller/orders/${id}`, { status: value });
  };

  const handleStatus = ({ target: { value } }) => {
    setStatus(value);
    setInTrasit(true);
    setPreparing(false);

    if (value === 'Em Trânsito') {
      setPreparing(true);
    }

    changeStatusInDB(value);
  };

  if (sales.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div>
        <p
          data-testid={ dataTestsIds[54] }
        >
          {`Pedido: ${id}`}
        </p>
      </div>
      <span
        data-testid={ dataTestsIds[56] }
      >
        {formatDate(saleDate)}
      </span>
      <span
        data-testid={ dataTestsIds[55] }
      >
        {status}
      </span>
      <button
        data-testid={ dataTestsIds[57] }
        type="button"
        onClick={ (event) => handleStatus(event) }
        disabled={ inTransit }
        value="Preparando"
      >
        Preparar Pedido
      </button>
      <button
        data-testid={ dataTestsIds[58] }
        type="button"
        disabled={ preparing }
        onClick={ (event) => handleStatus(event) }
        value="Em Trânsito"
      >
        Saiu para entrega
      </button>
      <section>
        <table>
          <thead>
            <tr>
              {thArr.map((element, index) => (
                <th key={ index } className="thDetailsTable">{element}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map(({ quantity, name, price }, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `${dataTestsIds[59]}${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `${dataTestsIds[60]}${index}` }
                >
                  {name}
                </td>
                <td
                  data-testid={ `${dataTestsIds[61]}${index}` }
                >
                  {quantity}
                </td>
                <td
                  data-testid={ `${dataTestsIds[62]}${index}` }
                >
                  {price.replace('.', ',')}
                </td>
                <td
                  data-testid={ `${dataTestsIds[63]}${index}` }
                >
                  {`${(quantity * price).toFixed(2).replace('.', ',')}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div
        data-testid={ `${dataTestsIds[64]}` }
      >
        {total.replace('.', ',')}
      </div>
    </div>
  );
}
