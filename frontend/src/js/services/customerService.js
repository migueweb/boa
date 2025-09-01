import api from "../utils/api";
import serviceHandler from "../utils/serviceHandler";
import Auth from "../auth.js"

export async function getCustomers() {
  return await serviceHandler(() => api.get("/customers/get"));
}

export async function getCustomersByCompany() {
  const user = Auth.getUser(); // <-- Ejecutar la función
  const companyId = user?.company_id;

  if (!companyId) {
    throw new Error("No company_id found in localStorage");
  }

  return await serviceHandler(async () =>
    await api.get(`/customers/get`, {
      params: { company_id: companyId },
    })
  );
}