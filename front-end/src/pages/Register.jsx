import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { requestRegister } from '../services/api';

export default function Register() {
  const [dataRegister, setDataRegister] = useState({ name: '', email: '', password: '' });
  const [conflic, setConflict] = useState(false);
  const history = useHistory();

  const onInputChange = ({ target: { value, name } }) => {
    setDataRegister({ ...dataRegister, [name]: value });
  };

  const registerOnClick = async () => {
    try {
      await requestRegister('/register', dataRegister);
      history.push('/customer/products');
    } catch (error) {
      setConflict(true);
    }
  };

  const onClick = async () => {
    await registerOnClick();
  };

  const isButtonDisabled = () => {
    const { name, email, password } = dataRegister;
    const pattern = /^[\w-.]+@[\w]+.com(.br)?$/;
    const isEmailValid = pattern.test(email);

    const minLengthPassword = 6;
    const isPasswordValid = password.length >= minLengthPassword;
    const minLengthName = 12;
    const isNameValid = name.length >= minLengthName;
    return !(isEmailValid && isPasswordValid && isNameValid);
  };

  return (
    <section>
      <Input
        type="text"
        placeholder="Seu Nome"
        dataTestId="common_register__input-name"
        value={ dataRegister.name }
        onChange={ onInputChange }
        name="name"
        label="Name"
      />
      <Input
        type="text"
        placeholder="seu-email@site.com.br"
        dataTestId="common_register__input-email"
        value={ dataRegister.email }
        onChange={ onInputChange }
        name="email"
        label="Email"
      />
      <Input
        type="password"
        placeholder="**********"
        dataTestId="common_register__input-password"
        value={ dataRegister.password }
        onChange={ onInputChange }
        name="password"
        label="Password"
      />
      <Button
        dataTestId="common_register__button-register"
        content="REGISTER"
        onClick={ onClick }
        isDisabled={ isButtonDisabled() }
      />
      {
        conflic && (
          <div
            data-testid="common_register__element-invalid_register"
          >
            email ja cadastrado
          </div>
        )
      }
    </section>
  );
}
