const { SECRET_KEY = 'dev-key', HASH_LENGTH = 10 } = process.env;

module.exports = { SECRET_KEY, HASH_LENGTH };
