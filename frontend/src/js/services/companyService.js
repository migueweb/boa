import api from "../utils/api";

export async function getCompanies() {
    try {
        const response = await api.get("/companies");
        return response.data.data; 
    } catch (error) {
        console.error("Error fetching companies:", error);
        return [];
    }
}
