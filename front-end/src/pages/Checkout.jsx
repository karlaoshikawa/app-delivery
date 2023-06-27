import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DeliveryDetails from '../components/DeliveryDetails';
import Navbar from '../components/Navbar';
import TableProductsCheckout from '../components/TableProductsCheckout';

export default function Checkout() {
  const productsListCart = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const soma = productsListCart.reduce((acc, curr) => {
      acc += (+(curr.price) * curr.quantity);
      return acc;
    }, 0);
    setTotalPrice(soma);
  }, [productsListCart]);

  return (
    <main>
      <Navbar />
      <h1>Finalizar Pedido</h1>
      <TableProductsCheckout
        totalPrice={ totalPrice }
        productsCart={ productsListCart }
        dataTestid="customer_checkout"
      />
      <DeliveryDetails totalPrice={ totalPrice } productsCart={ productsListCart } />
    </main>
  );
}
