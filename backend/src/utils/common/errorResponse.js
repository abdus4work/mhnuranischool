class ErrorResponse {
  constructor(statusCode, errorCode, message, details = null, data = null) {
    this.success = false;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
    this.details = details;
    this.data = data;
  }
  toJSON() {
    return {
      success: this.success,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      message: this.message,
      details: this.details,
      data: this.data
    };
  }
}
export default ErrorResponse;
