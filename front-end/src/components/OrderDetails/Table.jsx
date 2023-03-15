import React from 'react';
import propTypes from 'prop-types';
import dataTestsIds from '../../utils/dataTestsIds';
import formatDate from '../../utils/formatDate';
import calcTotalPrice from '../../utils/calcTotalPrice';

export default function Table({ status, handleStatus, sellerName, id, apiResult }) {
  const thArr = [
    'Item',
    'Descrição',
    'Quantidade',
    'Valor Unitário',
    'Sub-total',
  ];

  const FOUR = 4;
  return (
    <section className="detaisSection">
      <h1>Detalhe do pedido</h1>
      <section className="orderSection">
        <section className="orderDetails">
          <p
            data-testid={ `${dataTestsIds[38]}` }
            className="detailsOrderId"
          >
            {`Pedido ${id.toString().padStart(FOUR, '0')}`}
          </p>
          <p
            data-testid={ `${dataTestsIds[39]}` }
            className="detailsSeller"
          >
            {`P. Vend: ${sellerName()}`}
          </p>
          <p
            data-testid={ `${dataTestsIds[40]}` }
            className="detailsDate"
          >
            {formatDate(apiResult.order.saleDate)}
          </p>
          <p
            data-testid={ `${dataTestsIds[41]}` }
            className="detailsStatus"
          >
            { status }
          </p>
          <button
            type="button"
            data-testid={ `${dataTestsIds[48]}` }
            disabled={ status !== 'Em Trânsito' }
            onClick={ (event) => handleStatus(event) }
            value="Entregue"
            className="detailsBtn"
          >
            MARCAR COMO ENTREGUE
          </button>
        </section>
        <table className="detailsTable">
          <thead>
            <tr>
              {thArr.map((element, index) => (
                <th key={ index } className="thDetailsTable">{element}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apiResult.products.map(({ name, price, quantity }, i) => (
              <tr key={ i } className="detailsTableItemsTr">
                <td
                  data-testid={ `${dataTestsIds[42]}${i}` }
                >
                  <p className="detailsTableItems detailsItemIndex">{i + 1}</p>
                </td>
                <td
                  data-testid={ `${dataTestsIds[43]}${i}` }
                >
                  <p className="detailsTableItems detailsDescription">{name}</p>
                </td>
                <td
                  data-testid={ `${dataTestsIds[44]}${i}` }
                >
                  <p className="detailsTableItems detailsQuantity">{quantity}</p>
                </td>
                <td
                  data-testid={ `${dataTestsIds[45]}${i}` }
                >
                  <p
                    className="detailsTableItems detailsPrice"
                  >
                    {`R$ ${Number(price).toFixed(2).replace('.', ',')}`}
                  </p>
                </td>
                <td
                  data-testid={ `${dataTestsIds[46]}${i}` }
                >
                  <p className="detailsTableItems detailsSubtotal">
                    {`R$ ${(Number(price) * Number(quantity))
                      .toFixed(2).replace('.', ',')}`}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p data-testid={ `${dataTestsIds[47]}` } className="totalPriceDetails">
          { apiResult.products.length
          && `Total: R$ ${calcTotalPrice(apiResult.products)}`}
        </p>
      </section>
    </section>
  );
}

Table.propTypes = {
  status: propTypes.string,
  handleStatus: propTypes.func,
  sellerName: propTypes.func,
  id: propTypes.number,
  apiResult: propTypes.object,
}.isRequired;
