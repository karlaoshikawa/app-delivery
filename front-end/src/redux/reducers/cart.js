import { ADD_CART_ITEM, REMOVE_CART_ITEM, REMOVE_CART_PRODUCT } from '../actions';

const initialState = [];

const addProduct = (state, newProduct) => {
  const added = state.some((product) => product.id === newProduct.id);
  if (added) {
    return state.map((product) => {
      if (product.id === newProduct.id) return newProduct;
      return product;
    });
  }

  return [...state, newProduct];
};

const removeProduct = (id, state) => state.map((product) => {
  if (product.id === id) product.quantity -= 1;
  return product;
}).filter((product) => product.quantity > 0);

const cart = (state = initialState, action) => {
  switch (action.type) {
  case ADD_CART_ITEM:
    return addProduct(state, action.product);
  case REMOVE_CART_ITEM:
    return removeProduct(action.id, state);
  case REMOVE_CART_PRODUCT:
    return action.product;
  default:
    return state;
  }
};

export default cart;
