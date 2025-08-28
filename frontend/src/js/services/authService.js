import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

export async function loginService(data) {
  return await serviceHandler(async () => await api.post("/auth/login", data))
}