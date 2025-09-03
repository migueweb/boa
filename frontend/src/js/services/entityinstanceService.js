import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";
import Auth from "../auth";

export async function getEntitiesInstance() {
  const user = Auth.getUser(); // <-- Ejecutar la función
  const companyId = user?.company_id;

  if (!companyId) {
    throw new Error("No company_id found in localStorage");
  }

  return await serviceHandler(async () =>
    await api.get(`entityinstance/get`, {
      params: { company_id: companyId },
    })
  );
 }