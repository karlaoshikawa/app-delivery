const { readFileSync } = require('fs');
const jwt = require('jsonwebtoken');

const secret = readFileSync('jwt.evaluation.key');
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, secret, jwtConfig);
const validateToken = (token) => jwt.verify(token, secret);

module.exports = { createToken, validateToken };
