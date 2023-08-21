const { UNAUTHORIZED } = require('./ErrorStatuses');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
