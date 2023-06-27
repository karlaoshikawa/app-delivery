const { Op } = require('sequelize');
const { users } = require('../database/models');

const getUserByEmail = async (email) => {
  const user = await users.findOne({ where: { email } });
  if (!user) {
    return { type: 404, message: 'Not found' };
  }
  return { type: 200, message: user };
};

const createUser = async ({ name, email, password }) => {
  const [user, created] = await users.findOrCreate({
    where: { email },
    defaults: {
      name,
      password,
      role: 'customer',
    },
  });
  if (!created) {
    return { type: 409, message: 'user already exists' };
  }
  return { type: 201, message: user };
};

const createUserByRole = async ({ name, email, password, role }) => {
  const [user, created] = await users.findOrCreate({
    where: { email },
    defaults: {
      name,
      password,
      role,
    },
  });
  if (!created) {
    return { type: 409, message: 'user already exists' };
  }
  return { type: 201, message: user };
};

const getSellers = async () => { 
  const sellers = await users.findAll({
    where: { role: 'seller' } });
  return sellers;
};

const getSaleById = async (id) => {
  const seller = await users.findByPk(id);
  return seller;
};

const getAllExcludeAdm = async () => { 
  const sellers = await users.findAll({
    where: { role: {
      [Op.ne]: 'administrator',
    } }, 
    order: [['id', 'ASC']],
  });
  return sellers;
};

const deleteUser = async (id) => {
  await users.destroy({
    where: { id },
  });
};

module.exports = { 
  getUserByEmail,
  getSellers,
  createUser,
  createUserByRole,
  getAllExcludeAdm, 
  deleteUser,
  getSaleById,
};
