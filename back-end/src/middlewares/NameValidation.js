const NameValidation = ({ body }, res, next) => {
  const { name } = body;
  if (name.length < 12) {
    return res.status(400).json({ message: ' have to be at least 12 characters' });
  }
  return next();
};

module.exports = {
  NameValidation,
};