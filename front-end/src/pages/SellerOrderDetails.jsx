import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import TableProductsCheckout from '../components/TableProductsCheckout';
import { requestData, requestUpdate } from '../services/api';

export default function OrderDetails() {
  const dataTestId = 'seller_order_details__element-order-details-label';

  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const stringfyId = `${id}`;
  const MIN_ID_LENGTH = 4;
  const [saleData, setSaleData] = useState({});
  // const [statusPedido, setStatusPedido] = useState('');
  const [productsListCart, setProductsListCart] = useState([]);
  const [statusEntregue, setStatusEntregue] = useState('Pendente');

  useEffect(() => {
    const data = async () => {
      try {
        const response = await requestData(`/sales/${id}`, token);
        setStatusEntregue(response.status);
        // const status = (response.status === 'entregue') ? setStatusEntregue(true) : null;
        setSaleData(response);
        // return status;
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [id, statusEntregue, token]);

  const formatDate = new Date(saleData.saleDate).toLocaleDateString('pt-BR');

  useEffect(() => {
    const getProductList = async () => {
      try {
        const response = await requestData(`/salesProducts/${id}`, token);
        setProductsListCart(response.map((item) => ({
          quantity: item.quantity,
          ...item.product,
        })));
      } catch (error) {
        return error;
      }
    };
    getProductList();
  }, [id, token]);

  console.log('status', statusEntregue);
  const statusDelivered = async (statusPedido) => {
    await requestUpdate(`/sales/${id}`, { status: statusPedido }, token);
    setStatusEntregue(statusPedido);
  };

  return (
    <>
      <Navbar />
      <div>
        <p data-testid="seller_order_details__element-order-details-label-order-id">
          {`Pedido ${stringfyId.padStart(MIN_ID_LENGTH, '0')}`}
        </p>
        <p data-testid="seller_order_details__element-order-details-label-order-date">
          {formatDate}
        </p>
        <p data-testid={ `${dataTestId}-delivery-status-${id}` }>
          {statusEntregue}
        </p>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ statusEntregue !== 'Pendente' }
          onClick={ () => statusDelivered('Preparando') }
        >
          PREPARAR O PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ statusEntregue !== 'Preparando' }
          onClick={ () => statusDelivered('Em Trânsito') }
        >
          SAIU PARA A ENTREGA
        </button>
      </div>
      <h2>Detalhes do Pedido</h2>
      <TableProductsCheckout
        totalPrice={ +saleData.totalPrice }
        productsCart={ productsListCart }
        dataTestid="seller_order_details"
      />
    </>
  );
}
