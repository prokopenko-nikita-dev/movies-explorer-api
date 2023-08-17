const router = require('express').Router();
const isUrl = require('validator/lib/isURL');
const { celebrate, Joi } = require('celebrate');
const { errorMessages } = require('../utils/constants');

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const validationURL = (message) => (value, helpers) => {
  if (isUrl(value)) return value;
  return helpers.message(message);
};

router.get('/', getMovie);

router.post('/', celebrate({
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
}), createMovie);

router.delete('/_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
