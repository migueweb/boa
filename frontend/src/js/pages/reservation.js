import { reservationService } from "../services/reservationService.js";
import Table from "../components/table.js";
import modal from "../components/modal.js";
import Dashboard from "../components/Dashboard.js";

export default async function ReservationsPage() {
  async function renderTable() {
    try {
      const response = await reservationService({ document_customer: "104460307" });
      const reservations = response.data?.reservations || [];

      const columns = [
        { header: "Customer", field: "customer_name" },
        { header: "Document", field: "document" },
        { header: "Email", field: "email" },
        { header: "Phone", field: "phone" },
        { header: "Entity", field: "entity_instance_name" },
        { header: "Status", field: "reservation_status" },
        { header: "Start", field: "star_datetime" },
        { header: "End", field: "end_datetime" },
        { header: "Actions", field: "actions" },
      ];

      const data = reservations.map(r => ({
        ...r,
        start_datetime: new Date(r.start_datetime).toLocaleString(),
        end_datetime: new Date(r.end_datetime).toLocaleString(),
      }));

      document.getElementById("reservations-table").innerHTML = Table({ columns, data });
    } catch (error) {
      console.error("Error loading reservations:", error);
      document.getElementById("reservations-table").innerHTML =
        `<p class="text-red-500">Error loading reservations</p>`;
    }
  }

  const content = `
    ${modal()}
    <div id="reservations-table"></div>
  `;

  // escucho evento que emite el modal
  setTimeout(() => {
    renderTable();
    document.addEventListener("reservation:created", renderTable);
  }, 0);

  return Dashboard(content);
}
