class CustomError extends Error {
  constructor(
    statusCode,
    errorCode = 'ERR_GENERIC',
    message = 'An error occurred',
    details = null,
    data = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      message: this.message,
      details: this.details,
      data: this.data,
    };
  }
}

export default CustomError;
