const Auth = {
  isAuthenticated: () => !!localStorage.getItem("user"),

  login: (user, permissions = []) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("permissions", JSON.stringify(permissions));
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
  },

  getPermissions: () => {
    try {
      return JSON.parse(localStorage.getItem("permissions")) || [];
    } catch {
      return [];
    }
  },

  hasPermission: (permission) => {
    const perms = Auth.getPermissions();
    return perms.includes(permission);
  },
};

export default Auth;
