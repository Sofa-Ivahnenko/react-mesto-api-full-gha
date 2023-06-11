const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');

const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const { JWT_SECRET, NODE_ENV } = process.env;
const { DEV_SECRET, NODE_PRODUCTION } = require('../config');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      userSchema.create({
        name, about, avatar, email, password: hash,
      })
        .then(() => {
          res.status(201).send({
            data: {
              name, about, avatar, email,
            },
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError('This email has already been registered'));
          }
          if (err.name === 'Validation Error') {
            return next(new BadRequestError('Invalid data'));
          }
          return next(err);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return userSchema.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : DEV_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
