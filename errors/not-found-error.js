class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODES.NOT_FOUND;
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;
