import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { requestData } from '../services/api';
import Navbar from '../components/Navbar';

export default function CustomerProducts() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.user.token);

  const cartTotal = useSelector((state) => state
    .cart.reduce((acc, cur) => (cur.price * cur.quantity) + acc, 0));

  async function fetchProducts() {
    try {
      const data = await requestData('/products', token);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      {products.length === 0 ? '' : <ProductGrid products={ products } />}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ cartTotal === 0 }
        onClick={ () => history.push('/customer/checkout') }
      >
        Ver Carrinho:
        <b data-testid="customer_products__checkout-bottom-value">
          {String(cartTotal.toFixed(2)).replace('.', ',')}
        </b>
      </button>
    </div>
  );
}
