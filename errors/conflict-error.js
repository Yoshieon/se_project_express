const { ERROR_CODES } = require("../utils/constants");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODES.CONFLICT;
    this.name = "ConflictError";
  }
}

module.exports = ConflictError;
