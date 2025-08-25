/**
 * Middleware to check if a user is authenticated.
 *
 * This middleware verifies that the current request has a valid session
 * and that a `user` is stored in it. If the session is valid, it allows
 * the request to continue to the next handler. Otherwise, it responds with
 * a `401 Unauthorized` error.
 *
 * @function isAuthenticated
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void}
 */
export function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.error("Unauthorized", 401);
}

/**
 * List of public routes that do not require authentication.
 * Any path included here will bypass the authentication middleware.
 *
 * @constant {string[]}
 */
const publicRoutes = ["/auth/login", "/status"];

/**
 * Global authentication middleware.
 *
 * This middleware applies authentication checks to all routes,
 * except for those explicitly listed in `publicRoutes`.
 *
 * @function applyAuth
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void}
 */
export function applyAuth(req, res, next) {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  return isAuthenticated(req, res, next);
}
