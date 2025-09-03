import { getEntities } from "../services/entityService.js";
import Table from "../components/table.js";
import Dashboard from "../components/Dashboard.js";
import entityModal from "../components/entitiesModal.js";

export default async function EntitiesPage() {
  async function renderTable() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getEntities(user.company_id);
      const entities = response.data || [];

      const columns = [
        { header: "ID", field: "id" },
        { header: "Plural Name", field: "plural_name" },
        { header: "Single Name", field: "single_name" },
        { header: "Actions", field: "actions" }, // 👈 aquí agregamos acciones
      ];

      const data = entities.map(e => ({
        ...e,
        actions: `<button 
          class="btn btn-circle btn-text btn-outline-primary edit-entity" 
          data-id="${e.id}"
        >
          <i class="fas fa-edit"></i>
        </button>`,
      }));

      document.getElementById("entities-table").innerHTML = Table({ columns, data });

      // Escuchar clicks en los botones de editar
      document.querySelectorAll(".edit-entity").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          const entity = entities.find(ent => ent.id == id);

          // Emitir evento para abrir el modal con los datos de la entidad
          const event = new CustomEvent("entity:edit", { detail: entity });
          document.dispatchEvent(event);
        });
      });
    } catch (error) {
      console.error("Error loading entities:", error);
      document.getElementById("entities-table").innerHTML =
        `<p class="text-red-500">Error loading entities</p>`;
    }
  }

  const content = `
    <div>
      ${entityModal()}
      <div id="entities-table"></div>
    </div>
  `;

  setTimeout(() => {
    renderTable();
    document.addEventListener("entity:created", renderTable);
  }, 0);

  return Dashboard(content);
}
