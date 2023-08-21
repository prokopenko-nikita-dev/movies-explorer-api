const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const { errorMessages } = require('../utils/constants');

const validationURL = (message) => (value, helpers) => {
  if (isUrl(value)) return value;
  return helpers.message(message);
};

module.exports.validationPostMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().integer().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .uri()
      .required()
      .custom(validationURL(errorMessages.image)),
    trailerLink: Joi.string()
      .required()
      .custom(validationURL(errorMessages.thumbnail)),
    thumbnail: Joi.string()
      .uri()
      .required()
      .custom(validationURL(errorMessages.trailerLink)),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

module.exports.signup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
