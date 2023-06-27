import { useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function NavbarAdmin() {
  const history = useHistory();
  const { getState } = useStore();

  const { name } = getState().user;

  // useEffect(() => {
  //   if(!getState().login.token) return history.push('/');
  // });

  function logoff() {
    localStorage.clear();
  }

  return (
    <div>
      <button
        type="button"
        onClick={ () => history.push('/customer/orders') }
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </button>
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
