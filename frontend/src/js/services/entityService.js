import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";

export async function getEntities(companyId) {
  return await serviceHandler(() =>
    api.get(`/entitie/get?company_id=${companyId}`)
  );
}

export async function createEntity(payload) {
  return await serviceHandler(() =>
    api.post("/entitie/create", payload)
  );
}
