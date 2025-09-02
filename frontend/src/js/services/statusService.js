import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

/**
 * Obtiene los estados de reservación.
 * Ajusta la ruta según tu API (p.ej. "/reservation-states/get" o "/reservations/states")
 */
export async function getReservationStates(params) {
  // Si tu wrapper acepta params en GET, déjalo; si no, quítalos.
  return await serviceHandler(() => api.get("/reservation-states/get", params));
}
