import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

export async function getRole(data) {

    return await serviceHandler(async () => await api.get("/role/get", data))

}
