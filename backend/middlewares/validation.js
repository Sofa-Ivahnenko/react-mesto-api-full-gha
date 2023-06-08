const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequestError = require('../errors/bad-request-error');

const urlValidation = (url) => {
  if (isUrl(url)) {
    return url;
  }
  throw new BadRequestError('Неверный URL');
};

const idValidation = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (regex.test(id)) {
    return id;
  }
  throw new BadRequestError('Неверный id');
};

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidation),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidation),
  }),
});

module.exports.userIdValidation = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().custom(idValidation),
  }),
});

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidation),
  }),
});

module.exports.cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});
