import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

export async function logoutService() {
  return await serviceHandler(async () => await api.delete("/auth/logout"))
}