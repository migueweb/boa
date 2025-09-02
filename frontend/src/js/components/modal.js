import { getusers } from "../services/usersService.js";
import { getCustomersByCompany } from "../services/customerService.js";
import { getEntitiesInstance } from "../services/entityinstanceService.js";
import { createReservation } from "../services/reservationService.js";
import { getReservationStates } from "../services/reservationStatusService.js";

export default function modal() {
  const modalHTML = `
   <button type="button" class="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="form-modal" data-overlay="#form-modal">New Reservation</button>

<div id="form-modal" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden" role="dialog" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Create Reservation</h3>
        <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay="#form-modal"><span class="icon-[tabler--x] size-4"></span></button>
      </div>
      <form id="reservationForm">
        <div class="modal-body pt-0">
          <!-- USER -->
          <div class="mb-4">
            <label class="label-text" for="user_id">User</label>
            <select id="user_id" class="input" required>
              <option value="">-- Select User --</option>
            </select>
          </div>

          <!-- CUSTOMER -->
          <div class="mb-4">
            <label class="label-text" for="customer_id">Customer</label>
            <select id="customer_id" class="input" required>
              <option value="">-- Select Customer --</option>
            </select>
          </div>

          <!-- ENTITY -->
          <div class="mb-4">
            <label class="label-text" for="entity_instance_id">Entity Instance</label>
            <select id="entity_instance_id" class="input" required>
              <option value="">-- Select Entity --</option>
            </select>
          </div>

          <!-- RESERVATION STATE -->
          <div class="mb-4">
            <label class="label-text" for="reservation_state_id">Reservation State</label>
            <select id="reservation_state_id" class="input" required>
              <option value="">-- Select State --</option>
            </select>
          </div>

          <!-- FECHAS -->
          <div class="mb-0.5 flex gap-4 max-sm:flex-col">
            <div class="w-full">
              <label class="label-text" for="star_datetime">Start DateTime</label>
              <input type="datetime-local" class="input" id="star_datetime" required />
            </div>
            <div class="w-full">
              <label class="label-text" for="end_datetime">End DateTime</label>
              <input type="datetime-local" class="input" id="end_datetime" required />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-soft btn-secondary" data-overlay="#form-modal">Close</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</div>
  `;

  // 🔧 helper para cerrar overlays correctamente
  function closeOverlayById(id) {
    const modalEl = document.getElementById(id);
    if (!modalEl) return;

    modalEl.classList.add("hidden");
    modalEl.classList.remove("overlay-open");

    // quitar backdrop solo si no hay otros overlays abiertos
    const overlayOpen = document.querySelector(".overlay.overlay-open");
    if (!overlayOpen) {
      document.body.classList.remove("overlay-body-open");
      const backdrop = document.querySelector(".overlay-backdrop");
      if (backdrop) backdrop.remove();
    }
  }

  // ⚡ lógica después de insertar el modal en el DOM
  setTimeout(() => {
    const form = document.getElementById("reservationForm");
    const userSelect = document.getElementById("user_id");
    const customerSelect = document.getElementById("customer_id");
    const entitySelect = document.getElementById("entity_instance_id");
    const stateSelect = document.getElementById("reservation_state_id");

    // helper para renderizar opciones
    async function renderOptions(select, fetchFn, placeholder) {
      const response = await fetchFn();
      if (response?.success && Array.isArray(response.data.data)) {
        let options = `<option disabled selected>${placeholder}</option>`;
        response.data.data.forEach((item) => {
          const label =
            item.name ||
            item.plural_name ||
            item.title ||
            `Sin nombre (${item.id})`;
          options += `<option value="${item.id}">${label}</option>`;
        });
        select.innerHTML = options;
      } else {
        select.innerHTML = `<option disabled selected>Error loading ${placeholder}</option>`;
      }
    }

    // llenar selects
    renderOptions(userSelect, getusers, "Select a user");
    renderOptions(customerSelect, getCustomersByCompany, "Select a customer");
    renderOptions(entitySelect, getEntitiesInstance, "Select an entityInstance");
    renderOptions(stateSelect, getReservationStates, "Select reservation state");

    // submit
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        user_id: Number(userSelect.value),
        customer_id: Number(customerSelect.value),
        entity_instance_id: Number(entitySelect.value),
        reservation_state_id: Number(stateSelect.value),
        star_datetime: new Date(
          document.getElementById("star_datetime").value
        ).toISOString(),
        end_datetime: new Date(
          document.getElementById("end_datetime").value
        ).toISOString(),
      };

      try {
        const res = await createReservation(payload);
        console.log("Reservation saved:", res);
        alert("Reservation saved!");

        // cerrar modal y limpiar overlay
        closeOverlayById("form-modal");

        // opcional: limpiar formulario
        form.reset();

        // notificar que se creó una reserva
        document.dispatchEvent(new CustomEvent("reservation:created"));
      } catch (err) {
        console.error(err);
        alert("Error saving reservation");
      }
    });
  }, 50);

  return modalHTML;
}
