import Auth from "./auth.js";
import routes from "./routes.js";

/**
 * SPA Router class for handling navigation, authentication, and authorization.
 */
class Router {
  /**
   * Creates a Router instance.
   * @param {Object.<string, Route>} routes - An object mapping paths to route definitions.
   */
  constructor(routes) {
    /**
     * Application routes definition.
     * @type {Object.<string, Route>}
     */
    this.routes = routes;

    // Handle back/forward navigation
    window.addEventListener("popstate", () => this.loadRoute());
  }

  /**
   * Navigates to a given path and loads the corresponding route.
   * @param {string} path - The target path to navigate to.
   */
  async navigate(path) {
    history.pushState({}, "", path);
    await this.loadRoute();
  }

  /**
   * Loads and renders the current route based on the window location.
   * Handles authentication and permission-based authorization.
   */
  async loadRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes["/404"];

    // Middleware: Authentication
    if (route.auth && !Auth.isAuthenticated()) {
      return this.navigate("/login");
    }

    // Middleware: Guest routes (home, login, etc.)
    if (route.guest && Auth.isAuthenticated()) {
      return this.navigate("/dashboard");
    }

    // Middleware: Authorization
    if (route.permissions && route.permissions.length > 0) {
      const hasAllPermissions = route.permissions.every((p) =>
        Auth.hasPermission(p)
      );
      if (!hasAllPermissions) {
        return this.navigate("/");
      }
    }


  const app = document.querySelector("#app");
app.innerHTML = await route.view();
window.HSStaticMethods.autoInit();

}
}
export default new Router(routes);
