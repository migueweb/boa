import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

export async function getusers() {
  return await serviceHandler(() => api.get("/users/get"));
}