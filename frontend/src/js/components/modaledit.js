import { getusers } from "../services/usersService.js";
import { getCustomersByCompany } from "../services/customerService.js";
import { getEntitiesInstance } from "../services/entityinstanceService.js";
import { updateReservation } from "../services/reservationService.js";
import { getReservationStates } from "../services/reservationStatusService.js";

export default function modalEdit() {
  const modalHTML = `
<div id="edit-modal" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden" role="dialog" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Edit Reservation</h3>
        <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay="#edit-modal"><span class="icon-[tabler--x] size-4"></span></button>
      </div>
      <form id="reservationEditForm">
        <div class="modal-body pt-0">
          <!-- USER -->
          <div class="mb-4">
            <label class="label-text" for="edit_user_id">User</label>
            <select id="edit_user_id" class="input" required>
              <option value="">-- Select User --</option>
            </select>
          </div>

          <!-- CUSTOMER -->
          <div class="mb-4">
            <label class="label-text" for="edit_customer_id">Customer</label>
            <select id="edit_customer_id" class="input" required>
              <option value="">-- Select Customer --</option>
            </select>
          </div>

          <!-- ENTITY -->
          <div class="mb-4">
            <label class="label-text" for="edit_entity_instance_id">Entity Instance</label>
            <select id="edit_entity_instance_id" class="input" required>
              <option value="">-- Select Entity --</option>
            </select>
          </div>

          <!-- RESERVATION STATE -->
          <div class="mb-4">
            <label class="label-text" for="edit_reservation_state_id">Reservation State</label>
            <select id="edit_reservation_state_id" class="input" required>
              <option value="">-- Select State --</option>
            </select>
          </div>

          <!-- FECHAS -->
          <div class="mb-0.5 flex gap-4 max-sm:flex-col">
            <div class="w-full">
              <label class="label-text" for="edit_star_datetime">Start DateTime</label>
              <input type="datetime-local" class="input" id="edit_star_datetime" required />
            </div>
            <div class="w-full">
              <label class="label-text" for="edit_end_datetime">End DateTime</label>
              <input type="datetime-local" class="input" id="edit_end_datetime" required />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-soft btn-secondary" data-overlay="#edit-modal">Close</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</div>
  `;

  function closeOverlayById(id) {
    const modalEl = document.getElementById(id);
    if (!modalEl) return;
    modalEl.classList.add("hidden");
    modalEl.classList.remove("overlay-open");

    const overlayOpen = document.querySelector(".overlay.overlay-open");
    if (!overlayOpen) {
      document.body.classList.remove("overlay-body-open");
      const backdrop = document.querySelector(".overlay-backdrop");
      if (backdrop) backdrop.remove();
    }
  }

  setTimeout(() => {
    const form = document.getElementById("reservationEditForm");
    const userSelect = document.getElementById("edit_user_id");
    const customerSelect = document.getElementById("edit_customer_id");
    const entitySelect = document.getElementById("edit_entity_instance_id");
    const stateSelect = document.getElementById("edit_reservation_state_id");

    // Renderizar selects igual que en create
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

    renderOptions(userSelect, getusers, "Select a user");
    renderOptions(customerSelect, getCustomersByCompany, "Select a customer");
    renderOptions(entitySelect, getEntitiesInstance, "Select an entityInstance");
    renderOptions(stateSelect, getReservationStates, "Select reservation state");

    // 💡 función global para abrir modal desde la tabla
    window.openEditModal = function (reservation) {
      form.dataset.id = reservation.id;

      userSelect.value = reservation.user_id || "";
      customerSelect.value = reservation.customer_id || "";
      entitySelect.value = reservation.entity_instance_id || "";
      stateSelect.value = reservation.reservation_state_id || "";

      if (reservation.star_datetime) {
        document.getElementById("edit_star_datetime").value = reservation.star_datetime.slice(0, 16);
      }
      if (reservation.end_datetime) {
        document.getElementById("edit_end_datetime").value = reservation.end_datetime.slice(0, 16);
      }

      document.getElementById("edit-modal").classList.remove("hidden");
      document.getElementById("edit-modal").classList.add("overlay-open");
    };

    // Submit editar
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = form.dataset.id;

      const payload = {
        user_id: Number(userSelect.value),
        customer_id: Number(customerSelect.value),
        entity_instance_id: Number(entitySelect.value),
        reservation_state_id: Number(stateSelect.value),
        star_datetime: new Date(document.getElementById("edit_star_datetime").value).toISOString(),
        end_datetime: new Date(document.getElementById("edit_end_datetime").value).toISOString(),
      };

      try {
        const res = await updateReservation(id, payload);
        console.log("Reservation updated:", res);
        alert("Reservation updated!");

        closeOverlayById("edit-modal");
        form.reset();

        document.dispatchEvent(new CustomEvent("reservation:updated"));
      } catch (err) {
        console.error(err);
        alert("Error updating reservation");
      }
    });
  }, 50);

  return modalHTML;
}
