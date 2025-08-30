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
        <tr>
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
                    <button class="btn btn-circle btn-text btn-sm" aria-label="More">
                      <span class="icon-[tabler--dots-vertical] size-5"></span>
                    </button>
                  </td>
                `;
              }

              // 👇 corregido: ahora chequea reservation_status
              if (col.field === "reservation_status") {
                let badgeClass = "badge-soft badge-primary";
                if (row[col.field] === "Rejected")
                  badgeClass = "badge-soft badge-error";
                if (row[col.field] === "Pending")
                  badgeClass = "badge-soft badge-warning";
                if (row[col.field] === "Confirmed")
                  badgeClass = "badge-soft badge-success";

                return `<td><span class="badge ${badgeClass} text-xs">${
                  row[col.field]
                }</span></td>`;
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

  return `
    <div class="w-full overflow-x-auto">
      <table class="table">
        ${thead}
        ${tbody}
      </table>
    </div>
  `;
}
