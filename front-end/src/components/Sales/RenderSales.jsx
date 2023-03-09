import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dataTestsIds from '../../utils/dataTestsIds';

export default function RenderSales(
  { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber },
) {
  return (
    <Link
      data-testid={ `${dataTestsIds[49]}${id}` }
      to={ `/seller/orders/${id}` }
    >
      <h3
        data-testid={ `${dataTestsIds[49]}${id}` }
      >
        { id }

      </h3>
      <h3
        data-testid={ `${dataTestsIds[50]}${id}` }
      >
        { status }

      </h3>
      <h3
        data-testid={ `${dataTestsIds[51]}${id}` }
      >
        { saleDate }

      </h3>
      <h3
        data-testid={ `${dataTestsIds[52]}${id}` }
      >
        { totalPrice.replace('.', ',') }

      </h3>
      <h3
        data-testid={ `${dataTestsIds[53]}${id}` }
      >
        { `${deliveryAddress}, ${deliveryNumber}` }
      </h3>
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
