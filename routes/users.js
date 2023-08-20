const router = require('express').Router();
const { validationUpdateUser } = require('../middlewares/validation');

const {
  getUsers,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getUsers);
router.patch('/me', validationUpdateUser, updateProfile);

module.exports = router;
