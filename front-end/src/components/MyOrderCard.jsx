import React from 'react';
import PropTypes from 'prop-types';

export default function MyOrderCard({ id, status, date, totalPrice, deliveryAddress,
  deliveryNumber, dataTest }) {
  const MIN_ID_LENGTH = 4;
  const RGB_200 = 200;
  const RGB_255 = 255;
  const stringfyId = `${id}`;

  let color = `rgb(0, ${RGB_200}, ${RGB_200})`;
  if (status === 'Preparando') color = `rgb(0, ${RGB_255}, ${RGB_200})`;
  if (status === 'Entregue') color = `rgb(0, ${RGB_255}, 0)`;

  console.log('date', date);

  return (
    <div>
      <div
        data-testid={ `${dataTest}_orders__element-order-id-${id}` }
      >
        {`Pedido
        ${stringfyId.padStart(MIN_ID_LENGTH, '0')}`}
      </div>
      <div
        data-testid={ `${dataTest}_orders__element-delivery-status-${id}` }
        style={ { backgroundColor: color } }
      >
        {status}
      </div>
      <div
        data-testid={ `${dataTest}_orders__element-order-date-${id}` }
      >
        {date}
      </div>
      <div
        data-testid={ `${dataTest}_orders__element-card-price-${id}` }
      >
        {`R$: ${totalPrice}`}
      </div>
      {dataTest === 'seller' ? (
        <div
          data-testid={ `seller_orders__element-card-address-${id}` }
        >
          {`${deliveryAddress}, ${deliveryNumber}`}
        </div>
      ) : null}
    </div>
  );
}

MyOrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
};
