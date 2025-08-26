import permissionModel from "../models/permissionModel.js";


/**
 * Middleware to check if the authenticated user has the required permission.
 *
 * @function authorize
 * @param {string} requiredPermission - The permission string required to access the route.
 * @returns {RequestHandler} Express middleware function.
 *
 * @example
 * // Protect a route so only users with "user_create" permission can access
 * router.post("/users", authorize("user_create"), validate(userSchema), userService.create);
 */
export function authorize(requiredPermission) {
  return async (req, res, next) => {
    try {
      const userId = req.session?.user?.id; // user must be authenticated to arrive here

      const permissions = await permissionModel.getPermissionsByUserId(userId);

      if (!permissions.includes(requiredPermission)) {
        return res.error("Forbidden", 403);
      }

      next();
    } catch (err) {
      console.error(err);
      res.error("Server error");
    }
  };
}
