import { request, response } from "express";
/**
 * Middleware that extends the Express `res` object with
 * standardized response helpers: `res.success` and `res.error`.
 *
 * @param {request} req - Express request object
 * @param {response & {
 *   success?: (data?: any, message?: string, code?: number) => void,
 *   error?: (message?: string, code?: number, details?: any) => void
 * }} res - Express response object (extended with custom methods)
 * @param {next} next - Express next function
 */
export default function globalResponseHandler(req, res, next) {
  /**
   * Send a standardized success response
   *
   * @param {any} [data=null] - Payload returned in the response
   * @param {string} [message="Operation successful"] - Success message
   * @param {number} [code=200] - HTTP status code
   */
  res.success = (data = null, message = "Operation successful", code = 200) => {
    res.status(code).json({
      success: true,
      data,
      message,
    });
  };

  /**
   * Send a standardized error response
   *
   * @param {string} [message="An error occurred"] - Error message
   * @param {number} [code=500] - HTTP status code
   * @param {any} [details=null] - Extra debug information
   */
  res.error = (message = "An error occurred", code = 500, details = null) => {
    res.status(code).json({
      success: false,
      error: {
        code,
        message,
        details,
      },
    });
  };

  next();
}
