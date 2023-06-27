import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { requestData, requestInsert } from '../services/api';

export default function DeliveryDetails({ totalPrice, productsCart }) {
  const history = useHistory();
  const token = useSelector((state) => state.user.token);

  const [seller, setSeller] = useState([]);
  const [sellerId, setSellerId] = useState(2);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');

  useEffect(() => {
    const sellerList = async () => {
      try {
        const response = await requestData('/sellers');
        setSeller(response);
      } catch (error) {
        return error;
      }
    };
    sellerList();
  }, []);

  const createSale = async () => {
    // await setToken(token);
    const data = await requestInsert('/sales', {
      sellerId,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      products: productsCart,
      status: 'Pendente',
    }, token);
    console.log('data', data);
    history.push(`/customer/orders/${data.result.id}`);
  };

  return (
    <>
      <h2>Detalhes e Endereço para a Entrega</h2>
      <div>
        <label htmlFor="seller">
          Pessoa Vendedora Responsável
          <select
            id="seller"
            data-testid="customer_checkout__select-seller"
            onChange={ (e) => setSellerId(e.target.value) }
          >
            {seller.map((item) => (
              <option
                key={ item.id }
                value={ item.id }
              >
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="endereco">
          Endereço:
          <input
            type="text"
            id="endereco"
            name="endereco"
            data-testid="customer_checkout__input-address"
            placeholder="Rua: 21 de junho"
            onChange={ (e) => setAddress(e.target.value) }
          />
        </label>

        <label htmlFor="enderecoNumber">
          Numero:
          <input
            type="number"
            id="enderecoNumber"
            name="enderecoNumber"
            data-testid="customer_checkout__input-address-number"
            placeholder="00"
            onChange={ (e) => setAddressNumber(e.target.value) }
          />
        </label>
      </div>

      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ createSale }
      >
        Finalizar Pedido
      </button>
    </>
  );
}

DeliveryDetails.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  productsCart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
