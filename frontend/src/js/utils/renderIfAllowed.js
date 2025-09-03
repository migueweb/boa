import Auth from "../auth"

/**
 * Returns an HTML string if the user has at least one of the required permissions.
 *
 * @param {string} htmlString - The HTML to return.
 * @param {string|string[]} requiredPermissions - Permission(s) required.
 * @returns {string} - The HTML string if allowed, otherwise an empty string.
 */
export default function renderIfAllowed(htmlString, requiredPermissions) {
  const userPermissions = Auth.getPermissions() || []

  // Normalize to array
  const required = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions]

  // Allow if user has at least one permission
  const hasPermission = required.some(p => userPermissions.includes(p))

  return hasPermission ? htmlString.trim() : ""
}
