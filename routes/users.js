const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const {
  getUsers,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getUsers);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);
