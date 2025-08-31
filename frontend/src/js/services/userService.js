import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

export async function createUser(data) {

    return await serviceHandler(async () => await api.post("/user/create", data))
}

export async function getUsers() {
  return await serviceHandler(async () => await api.get("/user/get"));
}
