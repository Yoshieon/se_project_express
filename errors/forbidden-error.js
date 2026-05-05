class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODES.FORBIDDEN;
    this.name = "ForbiddenError";
  }
}

module.exports = ForbiddenError;
