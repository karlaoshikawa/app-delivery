import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestInsert, setToken } from '../services/api';
import { loginAction } from '../redux/actions';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const role = useSelector((state) => state.user.role);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [messageError, setmessageError] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const onInputChange = ({ target: { value, name } }) => {
    setLogin({ ...login, [name]: value });
  };

  /*
  Nossa aplicação esta com um framework de salvar o estado global automaticamente no localStorage,
  esta sendo salvo na chave persist:root, dentro dessa chave, vai ter todos os estados globais
  ex:
  const local = JSON.parse(localStorage.getItem('persist:root')); todos os objetos aqui dentro são string
  const data = JSON.parse(local.login);
  console.log(data);
  */

  useEffect(() => {
    let route = '';
    switch (role) {
    case 'customer':
      route = '/customer/products';
      break;
    case 'seller':
      route = '/seller/orders';
      break;
    case 'administrator':
      route = '/admin/manage';
      break;
    default:
      route = 'login';
    }
    history.push(route);
  }, [role]);

  const isButtonDisabled = () => {
    const emailPattern = /^[\w-.]+@[\w]+.com(.br)?$/;
    const isEmailValid = emailPattern.test(login.email);

    const minLengthPassword = 5;
    const isPasswordValid = login.password.length > minLengthPassword;

    return !(isEmailValid && isPasswordValid);
  };

  const loginClick = async () => {
    try {
      const response = await requestInsert('/login', login);
      localStorage.setItem('user', JSON.stringify(response));
      dispatch(loginAction(response));
      setToken(response.token);
      let route = '';
      switch (response.role) {
      case 'customer':
        route = '/customer/products';
        break;
      case 'seller':
        route = '/seller/orders';
        break;
      default:
        route = '/admin/manage';
      }
      history.push(route);
    } catch (error) {
      setmessageError('Email ou senha incorretos');
    }
  };
  return (
    <section>
      <Input
        type="text"
        placeholder="Login"
        value={ login.email }
        dataTestId="common_login__input-email"
        onChange={ onInputChange }
        name="email"
        label="Login"
      />
      <Input
        type="password"
        value={ login.password }
        placeholder="******"
        dataTestId="common_login__input-password"
        onChange={ onInputChange }
        name="password"
        label="Senha"
      />
      <Button
        dataTestId="common_login__button-login"
        content="LOGIN"
        onClick={ loginClick }
        isDisabled={ isButtonDisabled() }
      />
      <Button
        dataTestId="common_login__button-register"
        content="Ainda não tenho conta"
        onClick={ () => history.push('/register') }
        isDisabled={ false }
      />
      {messageError && (
        <div
          data-testid="common_login__element-invalid-email"
        >
          { messageError }
        </div>
      )}
    </section>
  );
}
