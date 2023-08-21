const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const { signup, signin } = require('../middlewares/validation');

router.post('/signup', signup, createUser);

router.post('/signin', signin, login);

router.get('/signout', logout);

module.exports = router;
