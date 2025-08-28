import Home from "./pages/Home.js";
import Login from "./pages/Login.js";


/**
 * Application route definitions.
 * 
 * Keys are URL paths, values are route configurations.
 * 
 * @type {Record<string, RouteConfig>}
 */
const routes = {
  "/": { view: Home, auth: false },
  "/login": { view: Login, auth: false },
/*   "/dashboard": { 
    view: Dashboard, 
    auth: true, 
    permissions: ["dashboard_access"] 
  }, */
  "/404": { view: () => "<h1>404 Not Found</h1>", auth: false },
};

export default routes