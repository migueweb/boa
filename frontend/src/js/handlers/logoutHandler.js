import Auth from "../auth";
import router from "../router";
import { logoutService } from "../services/logoutService";

export default async function logoutHandler(event) {
  await logoutService()
  Auth.logout()
  router.navigate("/")
}