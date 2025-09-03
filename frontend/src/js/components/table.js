export default function Table({ columns, data, onEdit, onDelete }) {
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
                    <button class="btn btn-circle btn-text btn-sm" aria-label="Edit" data-id="${row.id}">
                      <span class="icon-[tabler--pencil] size-5"></span>
                    </button>
                    <button class="btn btn-circle btn-text btn-sm" aria-label="Delete" data-id="${row.id}">
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
                  <td>
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

  // HTML de la tabla
  const html = `
    <div class="w-full overflow-x-auto">
      <table class="table">
        ${thead}
        ${tbody}
      </table>
    </div>
  `;

  // Eventos globales (solo una vez)
  if (!document.tableEventsBound) {
    document.addEventListener("click", (e) => {
      // EDIT
      if (e.target.closest("[aria-label='Edit']")) {
        const id = e.target.closest("button").dataset.id;
        if (typeof Table.onEdit === "function") {
          Table.onEdit(id);
        }
      }

      // DELETE
      if (e.target.closest("[aria-label='Delete']")) {
        const id = e.target.closest("button").dataset.id;
        if (typeof Table.onDelete === "function") {
          Table.onDelete(id);
        }
      }
    });

    document.tableEventsBound = true;
  }

  // Guardamos los callbacks
  Table.onEdit = onEdit;
  Table.onDelete = onDelete;

  return html;
}
