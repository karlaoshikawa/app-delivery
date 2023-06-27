const validateEmailAndPassword = ({ body }, res, next) => {
  const { email, password } = body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const emailPattern = /^[\w-.]+@[\w]+.com(.br)?$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Email is invalid' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password have to be at least 5 characters' });
  }
  return next();
};

module.exports = {
  validateEmailAndPassword,
};