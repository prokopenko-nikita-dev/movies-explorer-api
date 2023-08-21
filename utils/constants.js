const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  /(https|http)?:\/\/(?:www\.|(?!www))front-movies.nomoredomains.xyz\/[a-z]+\/|[a-z]+\/|[a-z]+(\/|)/,
];

const errorMessages = {
  image: 'Некорректный формат ссылки на картинку',
  trailerLink: 'Некорректный формат ссылки на трейлер',
  thumbnail: 'Некорректный формат ссылки на постер',
  createMovie: 'Некорректные данные при создании фильма',
  movieNotFound: 'Фильм не найден',
  removeMovie: 'Попытка удалить фильм другого пользователя',
  userNotFound: 'Пользователь не найден',
  createUser: 'Пользователь уже существует',
  updateProfile: 'Email уже зарегистрирован',
  incorrectData: 'Неправильные почта или пароль',
  incorrectEmail: 'Некорректный формат почты',
  incorrectPath: 'Неправильный путь',
  auth: 'Необходима авторизация',
  crash: 'Сервер сейчас упадёт',
};

module.exports = { allowedCors, errorMessages };
