class AppError extends Error {
  statusCode: number;
  applicationCode: number;

  constructor(message: string, statusCode: number, applicationCode?: number) {
    super(message);
    this.statusCode = statusCode;
    this.applicationCode = applicationCode ?? statusCode;

    // Ensures proper stack trace (especially for V8 engines like Node.js)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
