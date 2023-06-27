import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import NavbarAdmin from '../components/NavbarAdmin';
import { requestData, requestDeleteUser, requestInsert } from '../services/api';

export default function Admin() {
  const [dataRegister, setDataRegister] = useState({ name: '', email: '', password: '' });
  const [selectOptions, setSelectOptions] = useState('customer');
  const [users, setUsers] = useState([]);
  const [conflic, setConflict] = useState(false);
  const { getState } = useStore();
  const { token } = getState().user;

  const handleChange = ({ target: { value } }) => {
    setSelectOptions(value);
  };

  const onInputChange = ({ target: { value, name } }) => {
    setDataRegister({ ...dataRegister, [name]: value });
  };

  const handleClick = async () => {
    try {
      const data = {
        ...dataRegister,
        role: selectOptions,
      };
      await requestInsert('/roleregister', data, token);
      setDataRegister({ name: '', email: '', password: '' });
    } catch (error) {
      setConflict(true);
    }
  };

  const deletButton = async (id) => {
    await requestDeleteUser(`/deleteuser/${id}`, token);
  };

  const getAll = async () => {
    const data = await requestData('/allexcludeadm', token);
    setUsers(data);
  };
  useEffect(() => {
    getAll();
  }, [token]);

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
    <>
      <header>
        <NavbarAdmin />
      </header>
      { conflic && (
        <div
          data-testid="admin_manage__element-invalid-register"
        >
          email ja cadastrado
        </div>
      ) }
      <div>
        <h2>Cadastrar novo usuário</h2>
        <div>
          <Input
            type="text"
            placeholder="Seu Nome"
            dataTestId="admin_manage__input-name"
            value={ dataRegister.name }
            onChange={ onInputChange }
            name="name"
            label="Name"
          />
          <Input
            type="text"
            placeholder="seu-email@site.com.br"
            dataTestId="admin_manage__input-email"
            value={ dataRegister.email }
            onChange={ onInputChange }
            name="email"
            label="Email"
          />
          <Input
            type="password"
            placeholder="**********"
            dataTestId="admin_manage__input-password"
            value={ dataRegister.password }
            onChange={ onInputChange }
            name="password"
            label="Password"
          />
          <select
            name="role"
            id="role"
            value={ selectOptions }
            data-testid="admin_manage__select-role"
            onChange={ handleChange }
          >
            <option value="customer">cliente</option>
            <option value="seller">vendedor</option>
            <option value="administrator">adm</option>
          </select>
          <Button
            dataTestId="admin_manage__button-register"
            content="REGISTER"
            onClick={ async () => {
              await handleClick();
              getAll();
            } }
            isDisabled={ isButtonDisabled() }
          />
        </div>
      </div>
      <div data-testid="admin_manage__element-user-table-name-">
        <h2>Lista de Usuarios</h2>
        {
          users.map((user, i) => (
            <div key={ user.id }>
              <p data-testid={ `admin_manage__element-user-table-item-number-${i}` }>
                {user.id}
              </p>
              <p data-testid="admin_manage__input-email">{user.name}</p>
              <p data-testid={ `admin_manage__element-user-table-email-${i}` }>
                {user.email}
              </p>
              <p data-testid={ `admin_manage__element-user-table-role-${i}` }>
                {user.role}
              </p>
              <button
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${i}` }
                onClick={ async () => {
                  await deletButton(user.id);
                  getAll();
                } }
              >
                EXCLUIR
              </button>
            </div>
          ))
        }
      </div>
    </>
  );
}
