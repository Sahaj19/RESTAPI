class ExpressError extends Error {
  constructor(statusCode, errorMessage) {
    super();
    this.status = statusCode;
    this.message = errorMessage;
  }
}

module.exports = ExpressError;
