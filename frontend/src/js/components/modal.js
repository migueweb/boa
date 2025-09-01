export default function modal() {

  return `
   <button type="button" class="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="form-modal" data-overlay="#form-modal">Modal with form</button>

<div id="form-modal" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden" role="dialog" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">User details</h3>
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

<!-- Middle End -->
    `;
}
