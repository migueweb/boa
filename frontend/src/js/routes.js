import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import ReservationsPage from "./pages/reservation.js";
import CreateUser from "./pages/createUser.js";
import Home from "./pages/Home.js"


/**
 * Application route definitions.
 * 
 * Keys are URL paths, values are route configurations.
 * 
 * @type {Record<string, RouteConfig>}
 */
const routes = {
  "/home": { view: Home},
  "/": { view: Login, auth: false, guest: true },
  "/dashboard": {
    view: Dashboard,
    auth: true,
    // permissions: ["dashboard_access"]
  },
  "/user": { view: CreateUser, auth: true },
  "/reservations": { view: ReservationsPage, auth: true },
  "/404": { view: () => "<h1>404 Not Found</h1>", auth: false },
};

export default routes;
