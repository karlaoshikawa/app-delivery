import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import TableProductsCheckout from '../components/TableProductsCheckout';
import { requestData, requestUpdate } from '../services/api';

export default function OrderDetails() {
  const dataTestId = 'customer_order_details__element-order-details-label';

  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const stringfyId = `${id}`;
  const MIN_ID_LENGTH = 4;
  const [saleData, setSaleData] = useState({});
  const [seller, setSeller] = useState('');
  const [productsListCart, setProductsListCart] = useState([]);
  const [statusEntregue, setStatusEntregue] = useState('Pendente');

  useEffect(() => {
    const data = async () => {
      try {
        const response = await requestData(`/sales/${id}`, token);
        // const status = (response.status === 'entregue') ? setStatusEntregue(true) : null;
        setStatusEntregue(response.status);
        setSaleData(response);
        // return status;
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, [id, statusEntregue, token]);

  useEffect(() => {
    const sellerName = async () => {
      try {
        const response = await requestData(`/sellers/${saleData.sellerId}`, token);
        setSeller(response.name);
      } catch (error) {
        return error;
      }
    };
    sellerName();
  }, [id, token, saleData]);

  console.log('seller', saleData.sellerId);

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

  const statusDelivered = async (statusPedido) => {
    await requestUpdate(`/sales/${id}`, { status: statusPedido }, token);
    setStatusEntregue(statusPedido);
  };

  return (
    <>
      <Navbar />
      <div>
        <p data-testid="customer_order_details__element-order-details-label-order-id">
          {`Pedido ${stringfyId.padStart(MIN_ID_LENGTH, '0')}`}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          {seller}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-order-date">
          {formatDate}
        </p>
        <p data-testid={ `${dataTestId}-delivery-status<index>` }>
          {statusEntregue}
        </p>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ statusEntregue !== 'Em Trânsito' }
          onClick={ () => statusDelivered('Entregue') }
        >
          Marcar como entregue
        </button>
      </div>
      <h2>Detalhes do Pedido</h2>
      <TableProductsCheckout
        totalPrice={ saleData.totalPrice }
        productsCart={ productsListCart }
        dataTestid="customer_order_details"
      />
    </>
  );
}
