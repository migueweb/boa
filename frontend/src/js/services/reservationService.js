import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

// Obtener reservas por params
export async function reservationService(params) {
  return await serviceHandler(async () =>
    await api.get("/reservations/get", { params })
  );
}

// Crear reserva
export async function createReservation(data) {
  return await serviceHandler(() =>
    api.post("/reservations/create", data)
  );
}

// Editar reserva
export async function updateReservation(id, data) {
  return await serviceHandler(() =>
    api.put(`/reservations/${id}`, data)
  );
}
