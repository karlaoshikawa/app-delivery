import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import MyOrderCard from '../components/MyOrderCard';
import { requestData } from '../services/api';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orders, setOrders] = useState('');
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await requestData('/orders', token);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrders();
  }, []);

  console.log('idProblematico', orders);

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
                {' '}
                <Link to="/customer/products">
                  Peça algo agora mesmo
                </Link>
              </div>
            ) : (
              <div>

                {orders.map((order) => {
                  const { status, saleDate, totalPrice } = order;
                  const maxDateLength = 10;
                  const dateWithoutHours = saleDate.substr(0, maxDateLength).replace(/-/g, '/');
                  const [year, month, day] = dateWithoutHours.split('/');
                  const transformedDate = `${day}/${month}/${year}`;
                  return (
                    <Link
                      to={ `/customer/orders/${order.id}` }
                      key={ order.id }
                    >
                      <MyOrderCard
                        key={ order.id }
                        id={ order.id }
                        status={ status }
                        date={ transformedDate }
                        totalPrice={ totalPrice.replace('.', ',') }
                        dataTest="customer"
                        deliveryAddress=""
                        deliveryNumber=""
                      />
                    </Link>
                  );
                })}
              </div>) }
          </div>
        ) }
    </div>
  );
}
