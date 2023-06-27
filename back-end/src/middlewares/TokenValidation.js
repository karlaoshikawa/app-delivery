const { validateToken } = require('../auth');

const TokenValidation = (req, res, next) => {
  try {
    const { authorization } = req.headers;
        if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
        }
    
    const { data } = validateToken(authorization);
    req.body.data = data;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

module.exports = {
  TokenValidation,
};