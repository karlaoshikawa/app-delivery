import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAction, removeCartProductAction } from '../redux/actions';

export default function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { getState } = useStore();
  const { name, role } = getState().user;

  // useEffect(() => {
  //   if(!getState().login.token) return history.push('/');
  // });
  function logoff() {
    dispatch(loginAction({
      name: '',
      email: '',
      role: '',
      token: '',
    }));
    dispatch(removeCartProductAction([]));
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      {(role === 'customer') ? (
        <>
          <button
            type="button"
            onClick={ () => history.push('/customer/products') }
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </button>
          <button
            type="button"
            onClick={ () => history.push('/customer/orders') }
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={ () => history.push('/seller/orders') }
          data-testid="customer_products__element-navbar-link-orders"
        >
          Pedidos
        </button>
      )}
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name }
      </p>
      <button
        type="button"
        onClick={ () => logoff() }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </div>
  );
}
