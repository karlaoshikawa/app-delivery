import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import MyOrderCard from '../components/MyOrderCard';
import { requestData } from '../services/api';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orders, setOrders] = useState('');
  const { token, id } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await requestData(`/orders/${id}`, token);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrders();
  }, [token]);

  return (
    <div>
      <Navbar />
      {typeof orders === 'string'
        ? <Loading />
        : (
          <div>
            { orders.length === 0 ? (
              <div>
                Nenhum pedido feito ainda 🤡
              </div>
            ) : (
              <div>
                {orders.map((order) => {
                  const {
                    status,
                    saleDate,
                    totalPrice,
                    deliveryAddress,
                    deliveryNumber } = order;
                  const maxDateLength = 10;
                  const dateWithoutHours = saleDate.substr(0, maxDateLength).replace(/-/g, '/');
                  return (
                    <Link
                      to={ `/seller/orders/${order.id}` }
                      key={ order.id }
                    >
                      <MyOrderCard
                        key={ order.id }
                        id={ order.id }
                        status={ status }
                        date={ dateWithoutHours }
                        totalPrice={ totalPrice.replace('.', ',') }
                        deliveryAddress={ deliveryAddress }
                        deliveryNumber={ deliveryNumber }
                        dataTest="seller"
                      />

                    </Link>
                  );
                })}
              </div>)}
          </div>
        ) }
    </div>
  );
}
