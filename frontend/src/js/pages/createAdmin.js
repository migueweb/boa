import { getCompanies } from "../services/companyService";

export default async function CreateAdmin() {
    

    return `
<button type="button" class="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="form-modal"
    data-overlay="#form-modal">Create new ser</button>

<div id="form-modal" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden" role="dialog"
    tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Create User</h3>
                <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
                    data-overlay="#form-modal"><span class="icon-[tabler--x] size-4"></span></button>
            </div>

            <form id="CreateAdmin">
                <div class="modal-body pt-0">
                    <div class="mb-0.5 flex gap-4 max-sm:flex-col">
                        <select class="select max-w-sm" aria-label="Disabled select">
                        </select>
                        <select class="select max-w-sm" aria-label="Disabled select" id="companySelect">
                            ${await renderCompanyOptions()}
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="label-text" for="fullName"> full name</label>
                        <input type="text" class="input" id="fullName" autoFocus />
                    </div>
                    <div class="mb-0.5 flex gap-4 max-sm:flex-col">
                        <div class="w-full">
                            <label class="label-text" for="email"> Email </label>
                            <input type="email" class="input" id="email" />
                        </div>
                        <div class="w-full">
                            <label class="label-text" for="userPassword">Password</label>
                            <input type="password" class="input" id="userPassword" name="password" />
                            <span class="helper-text text-end text-transparent">Error message</span>
                        </div>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-soft btn-secondary" data-overlay="#form-modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>

        </div>
    </div>
</div>
`
}

async function renderCompanyOptions() {
    const response = await getCompanies();

    console.log(response); // hey kabo mrk acostumbrate a imprimir la data siempre que la traes webon, de mi para mi


    if (response?.success && Array.isArray(response.data.data)) {

        let options = "<option disabled selected>Select a company</option>"

        response.data.data.forEach(company => {
            options += `<option value="${company.id}">${company.name}</option>`
        });

        console.log(options);
        
        return options

    } else {
        console.error('not get company');
        return '<option disabled selected>Error load companies</option>';
    }
}

