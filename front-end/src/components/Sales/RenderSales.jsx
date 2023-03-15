import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dataTestsIds from '../../utils/dataTestsIds';
import formatDate from '../../utils/formatDate';
import '../../styles/sellerOrders.css';

export default function RenderSales(
  { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber },
) {
  const FOUR = 4;
  const translateCss = {
    Pendente: 'pending',
    Preparando: 'Preparing',
    'Em Trânsito': 'inTransit',
    Entregue: 'delivered',
  };
  return (
    <Link
      data-testid={ `${dataTestsIds[49]}${id}` }
      to={ `/seller/orders/${id}` }
      className="sellerOrder"
    >
      <div className="sellerOrderId">
        <p>Pedido</p>
        <h3
          data-testid={ `${dataTestsIds[49]}${id}` }
        >
          { id.toString().padStart(FOUR, '0') }

        </h3>
      </div>
      <div className="divContainer">
        <div className="statasDatePriceDiv">
          <h3
            data-testid={ `${dataTestsIds[50]}${id}` }
            className={ `sellerOrderStatus ${translateCss[status]}` }
          >
            { status }

          </h3>
          <div className="sellerOrderPrice">
            <h3
              data-testid={ `${dataTestsIds[51]}${id}` }
            >
              { formatDate(saleDate) }

            </h3>
            <h3
              data-testid={ `${dataTestsIds[52]}${id}` }
            >
              { `R$ ${totalPrice.replace('.', ',')}` }

            </h3>
          </div>
        </div>
        <h3
          data-testid={ `${dataTestsIds[53]}${id}` }
          className="address"
        >
          { `${deliveryAddress}, ${deliveryNumber}` }
        </h3>
      </div>
    </Link>
  );
}

RenderSales.propTypes = {
  saleDate: PropTypes.Date,
  status: PropTypes.bool,
  totalPrice: PropTypes.number,
  id: PropTypes.number,
  deliveryAddress: PropTypes.string,
  deliveryNumber: PropTypes.number,
}.isRequired;
