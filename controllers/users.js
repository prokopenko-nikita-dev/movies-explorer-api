const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HASH_LENGTH, JWT_SECRET } = require('../environment/env');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const { customError } = require('../errors/CustomError');
const { CREATED } = require('../errors/ErrorStatuses');

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, HASH_LENGTH)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => User.findOne({
      _id: user._id,
    }))
    .then((user) => {
      res.status(CREATED).send(user);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.create({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'strict',
      });
      res.send({ token });
    })
    .catch((err) => next(err));
};

const getUsers = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      customError(err, req, res);
    });
};

const updateProfile = (req, res) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      customError(err, req, res);
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  updateProfile,
};
