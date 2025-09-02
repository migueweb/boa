import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js"
import ReservationsPage from "./pages/reservation.js";
import UserDashboard from "./pages/user.js";


/**
 * Application route definitions.
 * 
 * Keys are URL paths, values are route configurations.
 * 
 * @type {Record<string, RouteConfig>}
 */
const routes = {
  "/": { view: Home, auth: false, guest: true },
  "/login": { view: Login, auth: false, guest: true },
  "/dashboard": { view: Dashboard, auth: true, /* permissions: ["dashboard_access"]  */},
  "/reservations": {view: ReservationsPage, auth: true },
  "/user": { view: UserDashboard, auth: true},
  "/404": { view: () => "<h1>404 Not Found</h1>", auth: false },
};

export default routes