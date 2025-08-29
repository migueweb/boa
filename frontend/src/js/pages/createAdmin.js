export default function CreateAdmin(){
return`
<button type="button" class="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="form-modal"
    data-overlay="#form-modal">Crear Administrador</button>

<div id="form-modal" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden" role="dialog"
    tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Crear Administrador</h3>
                <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
                    data-overlay="#form-modal"><span class="icon-[tabler--x] size-4"></span></button>
            </div>
            <form>
                <div class="modal-body pt-0">

                    <div class="mb-4">
                        <label class="label-text" for="fullName"> Nombre completo</label>
                        <input type="text" class="input" id="fullName" autoFocus />
                    </div>
                    <div class="mb-0.5 flex gap-4 max-sm:flex-col">
                        <div class="w-full">
                            <label class="label-text" for="email"> Email </label>
                            <input type="email" placeholder="johndoe@123@gmail.com" class="input" id="email" />
                        </div>
                        <div class="w-full">
                            <label class="label-text" for="userPassword">Password</label>
                            <input type="password" class="input" id="userPassword" name="password" />
                            <span class="helper-text text-end text-transparent">Error message</span>
                        </div>
                    </div>
                    <div class="mb-0.5 flex gap-4 max-sm:flex-col">
                        <select class="select max-w-sm" aria-label="Disabled select" disabled>
                            <option disabled selected value="2">Administrador</option>
                        </select>
                        <select class="select max-w-sm" aria-label="Disabled select" id="companySelect">
                            <!-- <option disabled selected>Boa system</option> -->
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-soft btn-secondary" data-overlay="#form-modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>
`
}

