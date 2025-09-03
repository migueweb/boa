import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import ReservationsPage from "./pages/reservation.js";
<<<<<<< Updated upstream
import UserDashboard from "./pages/user.js";
=======
import EntitiesPage from "./pages/entitys.js"; // 👈 nuevo
>>>>>>> Stashed changes

const routes = {
  "/": { view: Home, auth: false, guest: true },
  "/login": { view: Login, auth: false, guest: true },
<<<<<<< Updated upstream
  "/dashboard": { view: Dashboard, auth: true, /* permissions: ["dashboard_access"]  */},
  "/reservations": {view: ReservationsPage, auth: true },
  "/users": { view: UserDashboard, auth: true, permissions: ["user_create", "user_create_admin", "user_create_staff", "user_delete", "user_read","user_update"]},
=======
  "/dashboard": { view: Dashboard, auth: true },
  "/reservations": { view: ReservationsPage, auth: true },
  "/entities": { view: EntitiesPage, auth: true }, // 👈 nueva ruta
>>>>>>> Stashed changes
  "/404": { view: () => "<h1>404 Not Found</h1>", auth: false },
};

export default routes;
