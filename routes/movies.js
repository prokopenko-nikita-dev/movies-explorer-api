const router = require('express').Router();
const {
  validationPostMovie,
  validationDeleteMovie,
} = require('../middlewares/validation');

const {
  getMovie,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovie);
router.post('/', validationPostMovie, createMovie);
router.delete('/:_id', validationDeleteMovie, deleteMovie);

module.exports = router;
