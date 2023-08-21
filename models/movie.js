const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const { errorMessages } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (link) => isUrl(link),
        message: errorMessages.image,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (link) => isUrl(link),
        message: errorMessages.trailerLink,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (link) => isUrl(link),
        message: errorMessages.thumbnail,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    monieId: {
      type: Number,
      require: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
