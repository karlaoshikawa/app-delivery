const md5 = require('md5');
const { createToken } = require('../auth');
const userService = require('../service/Users.service');

const getUserByEmail = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await userService.getUserByEmail(email);
  if (type === 404) return res.status(404).json({ message: 'Not found' });
  const hashedPassword = md5(password);
  if (hashedPassword !== message.password) {
    return res.status(400).json({ message: 'Email or password is incorrect' });
  }

  const token = createToken(message);
  const data = {
    token,
    name: message.name,
    email: message.email,
    role: message.role,
    id: message.id,
  };
  return res.status(200).json(data);
};

const createdUser = async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = md5(password);
  const data = {
    email,
    password: hashedPassword,
    name,
  };
  const { type, message } = await userService.createUser(data);
  if (type === 409) return res.status(type).json({ message });
  return res.status(type).json(message);
};

const createdUserByRole = async (req, res) => {
  const roleAdm = req.body.data.role;
  if (roleAdm !== 'administrator') {
    return res.status(404).json({ message: 'without authorization' });
  }
  const { email, password, name, role } = req.body;
  const hashedPassword = md5(password);
  const data = {
    email,
    password: hashedPassword,
    name,
    role,
  };
  const { type, message } = await userService.createUserByRole(data);
  if (type === 409) return res.status(type).json({ message });
  return res.status(type).json(message);
};

const getSellers = async (req, res) => {
  const sellers = await userService.getSellers();
  if (!sellers) return res.status(404).json({ message: 'User Not Found' });
  return res.status(200).json(sellers);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const seller = await userService.getSaleById(id);
  if (!seller) return res.status(404).json({ message: 'Seller Not Found' });
  return res.status(200).json(seller);
}; 

const getAllExcludeAdm = async (req, res) => {
  const response = await userService.getAllExcludeAdm();
  if (!response) return res.status(404).json({ message: 'User Not Found' });
  return res.status(200).json(response);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  return res.status(200).send();
};

module.exports = { 
  getSaleById,
  getUserByEmail,
  getSellers,
  createdUser,
  createdUserByRole,
  getAllExcludeAdm, 
  deleteUser, 
};
