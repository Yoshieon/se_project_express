class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODES.CONFLICT;
    this.name = "ConflictError";
  }
}

module.exports = ConflictError;
