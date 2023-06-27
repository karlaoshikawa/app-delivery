export const LOGIN = 'LOGIN';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const REMOVE_CART_PRODUCT = 'REMOVE_CART_PRODUCT';

export const loginAction = (login) => ({
  type: LOGIN,
  ...login,
});

export const addCartAction = (product) => ({
  type: ADD_CART_ITEM,
  product,
});

export const removeCartAction = (id) => ({
  type: REMOVE_CART_ITEM,
  id,
});

export const removeCartProductAction = (product) => ({
  type: REMOVE_CART_PRODUCT,
  product,
});
