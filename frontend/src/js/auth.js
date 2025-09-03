/**
 * Authentication utility for managing user session and permissions
 * using localStorage as a storage mechanism.
 */
const Auth = {

  /**
   * Checks if a user is currently authenticated.
   * 
   * @returns {boolean} True if a user is logged in, false otherwise.
   */
  isAuthenticated: () => !!localStorage.getItem("user"),

  /**
   * Logs in a user by saving user data and permissions to localStorage.
   * 
   * @param {Object} user - The user object to store (will be stringified).
   * @param {string[]} [permissions=[]] - Optional list of permissions for the user.
   * 
   * @example
   * Auth.login({ name: "Alice" }, ["reservation_read"]);
   */
  login: (user, permissions = []) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("permissions", JSON.stringify(permissions));
  },


  /**
   * Logs out the current user by clearing all session data from localStorage.
   * 
   * @example
   * Auth.logout();
   */
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
  },

  /**
   * Retrieves the current user's permissions from localStorage.
   * 
   * @returns {string[]} Array of permission strings, or an empty array if none.
   * 
   * @example
   * const perms = Auth.getPermissions();
   * // => ["reservation_read"]
   */
  getPermissions: () => {
    try {
      return JSON.parse(localStorage.getItem("permissions")) || [];
    } catch {
      return [];
    }
  },

    /**
   * Retrieves the current user's permissions from localStorage.
   * 
   * @returns {string[]} Array of permission strings, or an empty array if none.
   * 
   * @example
   * const perms = Auth.getPermissions();
   * // => ["reservation_read"]
   */
  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || [];
    } catch {
      return null;
    }
  },


  /**
   * Checks if the current user has a specific permission.
   * 
   * @param {string} permission - The permission string to check.
   * @returns {boolean} True if the user has the permission, false otherwise.
   * 
   * @example
   * if (Auth.hasPermission("reservation_read")) {
   *   // allow access
   * }
   */
  hasPermission: (permission) => {
    const perms = Auth.getPermissions();
    return perms.includes(permission);
  },
};

export default Auth;
