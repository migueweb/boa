import { createEntity } from "../services/entityService.js";

export default function entityModal() {
  const modalHTML = `
   <button type="button" class="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="entity-modal" data-overlay="#entity-modal">New Entity</button>

<div id="entity-modal" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden" role="dialog" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Create Entity</h3>
        <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay="#entity-modal"><span class="icon-[tabler--x] size-4"></span></button>
      </div>
      <form id="entityForm">
        <div class="modal-body pt-0">
          <!-- PLURAL NAME -->
          <div class="mb-4">
            <label class="label-text" for="plural_name">Plural Name</label>
            <input type="text" id="plural_name" class="input" required />
          </div>

          <!-- SINGLE NAME -->
          <div class="mb-4">
            <label class="label-text" for="single_name">Single Name</label>
            <input type="text" id="single_name" class="input" required />
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-soft btn-secondary" data-overlay="#entity-modal">Close</button>
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
    const form = document.getElementById("entityForm");
    const pluralInput = document.getElementById("plural_name");
    const singleInput = document.getElementById("single_name");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        company_id: user.company_id,
        plural_name: pluralInput.value,
        single_name: singleInput.value,
      };

      try {
        const res = await createEntity(payload);
        console.log("Entity saved:", res);
        alert("Entity saved!");

        // cerrar modal y limpiar overlay
        closeOverlayById("entity-modal");

        // limpiar formulario
        form.reset();

        // notificar que se creó una entidad
        document.dispatchEvent(new CustomEvent("entity:created"));
      } catch (err) {
        console.error(err);
        alert("Error saving entity");
      }
    });
  }, 50);

  return modalHTML;
}
