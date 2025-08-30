
import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

// service
export async function reservationService(params) {
  return await serviceHandler(async () => await api.get("/reservations/get", { params }) );
}