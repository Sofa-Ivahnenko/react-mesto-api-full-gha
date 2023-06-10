const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');

const { JWT_SECRET, NODE_ENV } = process.env;
const { DEV_SECRET, NODE_PRODUCTION } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('You need to log in'));
  }
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    return next(UnauthorizedError('You need to log in'));
  }
  req.user = payload;
  return next();
};
