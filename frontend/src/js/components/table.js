export default function Table({ columns, data }) {
  const thead = `
    <thead>
      <tr>
        ${columns.map((col) => `<th>${col.header}</th>`).join("")}
      </tr>
    </thead>
  `;

  const tbody = `
    <tbody>
      ${data
        .map(
          (row) => `
        <tr data-id="${row.id}">
          ${columns
            .map((col) => {
              if (col.field === "actions") {
                return `
                  <td>
                    <button class="btn btn-circle btn-text btn-sm" aria-label="Edit">
                      <span class="icon-[tabler--pencil] size-5"></span>
                    </button>
                    <button class="btn btn-circle btn-text btn-sm" aria-label="Delete">
                      <span class="icon-[tabler--trash] size-5"></span>
                    </button>
                  </td>
                `;
              }

              if (col.field === "reservation_status") {
                let badgeClass = "badge-soft badge-primary";
                if (row[col.field] === "Rejected") badgeClass = "badge-soft badge-error";
                if (row[col.field] === "Pending") badgeClass = "badge-soft badge-warning";
                if (row[col.field] === "Confirmed") badgeClass = "badge-soft badge-success";

                return `
                  <td class="status-cell">
                    <span class="badge ${badgeClass} text-xs">${row[col.field]}</span>
                  </td>
                `;
              }

              return `<td>${row[col.field] || ""}</td>`;
            })
            .join("")}
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;

  // Retornamos la tabla
  return `
    <div class="w-full overflow-x-auto">
      <table class="table">
        ${thead}
        ${tbody}
      </table>
    </div>
  `;
}

// 👇 Script para manejar editar y actualizar estado
document.addEventListener("click", (e) => {
  // Cuando se da clic en el botón Editar
  if (e.target.closest("[aria-label='Edit']")) {
    const rowEl = e.target.closest("tr");
    const statusCell = rowEl.querySelector(".status-cell");
    const currentStatus = statusCell.textContent.trim();
    const id = rowEl.dataset.id;

    // Reemplazamos badge por un select
    statusCell.innerHTML = `
      <select class="status-select" data-id="${id}">
        <option value="Pending" ${currentStatus === "Pending" ? "selected" : ""}>Pending</option>
        <option value="Confirmed" ${currentStatus === "Confirmed" ? "selected" : ""}>Confirmed</option>
        <option value="Rejected" ${currentStatus === "Rejected" ? "selected" : ""}>Rejected</option>
      </select>
    `;
  }
});

// Capturamos cambio en el select
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("status-select")) {
    const newStatus = e.target.value;
    const id = e.target.dataset.id;

    console.log("Actualizar reserva", id, "a estado:", newStatus);

    // Aquí llamas a tu servicio o API
    // updateReservationStatus(id, newStatus);

    // Opcional: volver a mostrar badge
    let badgeClass = "badge-soft badge-primary";
    if (newStatus === "Rejected") badgeClass = "badge-soft badge-error";
    if (newStatus === "Pending") badgeClass = "badge-soft badge-warning";
    if (newStatus === "Confirmed") badgeClass = "badge-soft badge-success";

    e.target.parentElement.innerHTML = `
      <span class="badge ${badgeClass} text-xs">${newStatus}</span>
    `;
  }
});
