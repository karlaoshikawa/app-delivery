import React, { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import { addCartAction, removeCartAction } from '../redux/actions';
// import cart from '../redux/reducers/cart';

export default function ProductCard({ product: { id, price, name, urlImage } }) {
  const [cartQuantity, setCartQuantity] = useState(0);
  const dispatch = useDispatch();
  const { getState } = useStore();

  const checkStorageQuantity = () => {
    const quantity = getState().cart
      .find((product) => product.id === id)?.quantity || 0;
    setCartQuantity(quantity);
  };

  useEffect(() => {
    checkStorageQuantity();
  }, []);

  const addCart = () => {
    const product = { id, price, name, urlImage, quantity: cartQuantity + 1 };
    dispatch(addCartAction(product));
  };

  const removeCart = () => {
    dispatch(removeCartAction(id));
  };

  return (
    <div>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {price.replace('.', ',')}
      </p>

      <img
        src={ urlImage }
        alt="Imagem de Produto"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>

      <div>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ () => { removeCart(); setCartQuantity(cartQuantity - 1); } }
          disabled={ (cartQuantity <= 0) }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ cartQuantity }
          type="text"
          onChange={ (e) => {
            setCartQuantity(Number(e.target.value));
            const product = { id, price, name, urlImage, quantity: (e.target.value) };
            dispatch(addCartAction(product));
          } }
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => { addCart(); setCartQuantity(cartQuantity + 1); } }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    urlImage: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
