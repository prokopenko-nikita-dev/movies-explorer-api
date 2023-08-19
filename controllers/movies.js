const Movie = require('../models/movie');
const { customError } = require('../errors/CustomError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovie = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удаляемая запись принадлежит другому пользователю');
      }
      Movie.deleteOne(movie)
        .orFail(() => {
          throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
        })
        .then((movieForDeleting) => {
          res.send(movieForDeleting);
        })
        .catch((err) => {
          customError(err, req, res, next);
        });
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

module.exports = {
  getMovie,
  createMovie,
  deleteMovie,
};
