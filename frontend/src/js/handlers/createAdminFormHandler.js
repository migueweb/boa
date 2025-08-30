import { getCompanies } from "../services/companyService.js";

export default async function adminHandler() {
    getCompanies()  
}
