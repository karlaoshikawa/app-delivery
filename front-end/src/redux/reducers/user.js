import { LOGIN } from '../actions';

const initialState = {
  name: '',
  email: '',
  role: '',
  token: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return ({
      ...state,
      name: action.name,
      email: action.email,
      role: action.role,
      token: action.token,
      id: action.id,
    });
  default:
    return state;
  }
};

export default user;
