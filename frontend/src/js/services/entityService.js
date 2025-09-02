import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

export async function getEntities() {
  return await serviceHandler(() => api.get("/entities/get"));
}