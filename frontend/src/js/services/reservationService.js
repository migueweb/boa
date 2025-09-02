
import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

// service
export async function reservationService(params) {
  return await serviceHandler(async () => await api.get("/reservations/get", { params }) );
}

export async function createReservation(data) {
  return await serviceHandler(() => api.post("/reservations/create", data));
}