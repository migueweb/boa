import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

export async function getCompanies(data) {

    return await serviceHandler(async () => await api.get("/company/get", data))

}
