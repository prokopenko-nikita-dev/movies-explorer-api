const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 60 * 1000,
  delayMs: 0,
  max: 100,
  message: JSON.stringify({
    error: 'Было слишком много запросов за 1 минуту',
    code: 429,
  }),
});
