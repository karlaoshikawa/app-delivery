import { useEffect, useState } from 'react';
import getTotalValue from '../utils/getTotalValue';

export default function TotalPrice() {
  const [totalPrice, setTotalPrice] = useState('00,00');

  useEffect(() => {
    const soma = getTotalValue();
    setTotalPrice(soma);
  }, []);

  return (
    <h2
      data-testid="customer_checkout__element-order-total-price"
    >
      {Number(totalPrice).toFixed(2).replace('.', ',')}
    </h2>
  );
}
