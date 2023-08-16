const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { errorMessages } = require('../utils/constants');

require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET', NODE_ENV } = process.env;

const handleAuthError = (next) => {
  next(new UnauthorizedError(errorMessages.auth));
};

const tokenVerify = (token) => {
  try {
    return jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
    );
  } catch (err) {
    return '';
  }
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return handleAuthError(next);
  }
  const payload = tokenVerify(token);
  if (!payload) {
    handleAuthError(next);
  }
  req.user = payload;
  return next();
};
