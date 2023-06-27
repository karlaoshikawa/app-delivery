import PropTypes from 'prop-types';
import { useStore, useDispatch } from 'react-redux';
import { removeCartProductAction } from '../redux/actions';

export default function TableProductsCheckout({ totalPrice, productsCart, dataTestid }) {
  const { getState } = useStore();
  console.log(getState().cart);

  const dispatch = useDispatch();

  const removeCartProduct = (id) => {
    console.log('remover', id);
    const cartList = productsCart.filter((i) => i.id !== +id);
    console.log('removido', cartList);
    dispatch(removeCartProductAction(cartList));
  };
  console.log('checkout', dataTestid);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>SubTotal</th>
            {(dataTestid === 'checkout') ? (<th>Remover Item</th>) : null}
          </tr>
        </thead>
        <tbody>
          {productsCart.length > 0 && (
            productsCart.map((item, i) => (
              <tr key={ i }>
                <td
                  data-testid={
                    `${dataTestid}__element-order-table-item-number-${i}`
                  }
                >
                  {i + 1}
                </td>
                <td
                  data-testid={ `${dataTestid}__element-order-table-name-${i}` }
                >
                  {item.name}
                </td>
                <td
                  data-testid={
                    `${dataTestid}__element-order-table-quantity-${i}`
                  }
                >
                  {item.quantity}
                </td>
                <td
                  data-testid={
                    `${dataTestid}__element-order-table-unit-price-${i}`
                  }
                >
                  {(item.price).replace('.', ',')}
                </td>
                <td
                  data-testid={
                    `${dataTestid}__element-order-table-sub-total-${i}`
                  }
                >
                  {(Number(item.price) * item.quantity).toFixed(2).replace('.', ',')}
                </td>
                <td
                  data-testid={
                    `${dataTestid}__element-order-table-remove-${i}`
                  }
                >
                  {(dataTestid === 'customer_checkout')
                    ? (
                      <button
                        type="button"
                        id={ item.id }
                        onClick={ (e) => removeCartProduct(e.target.id) }
                      >
                        Remover
                      </button>
                    ) : null}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <h2
        data-testid={ `${dataTestid}__element-order-total-price` }
      >
        R$:
        {' '}
        {Number(totalPrice).toFixed(2).replace('.', ',')}
      </h2>
    </>
  );
}

TableProductsCheckout.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  productsCart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dataTestid: PropTypes.string.isRequired,
};
