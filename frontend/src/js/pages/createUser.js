import { getCompanies } from "../services/companyService";
import { getRole } from "../services/roleService";
import { getUsers } from "../services/userService";


async function renderUserTable() {
    const response = await getUsers();

    if (!response.success || !Array.isArray(response.data.admins)) {
        return `<tr><td colspan="5" class="text-error text-center">Error loading users</td></tr>`;
    }

    const users = response.data.admins;

    if (users.length === 0) {
        return `<tr><td colspan="5" class="text-center text-neutral">No users found</td></tr>`;
    }

    const rows = users
        .map(
            (user) => `
        <tr>
          <td>${user.role_id}</td>
          <td>${user.company_id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            <button class="btn btn-circle btn-text btn-sm" aria-label="Edit">
              <span class="icon-[tabler--pencil] size-5"></span>
            </button>
            <button class="btn btn-circle btn-text btn-sm" aria-label="Delete">
              <span class="icon-[tabler--trash] size-5"></span>
            </button>
          </td>
        </tr>
      `
        )
        .join("");

    return rows;
}


export default async function CreateUser() {
    const userRows = await renderUserTable(); // obtenemos las filas

    return`
    <aside id="collapsible-sidebar"
    class="overlay [--body-scroll:true] border-base-content/20 overlay-open:translate-x-0 drawer drawer-start sm:overlay-layout-open:translate-x-0 hidden w-64 border-e [--auto-close:sm] [--is-layout-affect:true] [--opened:lg] sm:absolute sm:z-0 sm:flex sm:shadow-none lg:[--overlay-backdrop:false]"
    role="dialog" tabindex="-1">
    <div class="drawer-body px-2 pt-4">
      <ul class="menu p-0">
        <li>
          <a href="/dashboard">
            <span class="icon-[tabler--home] size-5"></span>
            Home
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-[tabler--users] size-5"></span>
            
          </a>
        </li>
      </ul>
    </div>
  </aside>

  <div class="sm:overlay-layout-open:ps-64 min-h-full bg-base-100 transition-all duration-300">
    <nav class="navbar justify-between gap-4 shadow-base-300/20 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown relative inline-flex [--auto-close:inside] [--offset:9]">
          <button type="button" class="btn btn-text btn-square" aria-haspopup="dialog" aria-expanded="false"
            aria-controls="collapsible-sidebar" data-overlay="#collapsible-sidebar">
            <span class="icon-[tabler--menu-2] size-5"></span>
          </button>
        </div>
      </div>
      <div class="navbar-center flex items-center">
        <a class="link text-base-content link-neutral text-xl font-bold no-underline" href="#">
          Boa system
        </a>
      </div>
      <div class="navbar-end items-center gap-4 ">
        <span class="badge badge-soft"></span>
        <span class="badge badge-soft badge-secondary"></span>
        <button class="btn btn-outline btn-primary waves waves-primary">Log out</button>
      </div>
    </nav>
    <main class="p-2 w-full">
    <button type="button" class="btn btn-primary mb-4" aria-haspopup="dialog" aria-expanded="false" aria-controls="form-modal"
      data-overlay="#form-modal">Create new user</button>

    <div class="border-base-content/25 w-full rounded-lg border mb-8">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>ID ROL</th>
              <th>ID COMPANY</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="user-table-container">
            ${userRows}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div id="form-modal" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden" role="dialog" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Create User</h3>
            <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
              data-overlay="#form-modal"><span class="icon-[tabler--x] size-4"></span></button>
          </div>

          <form id="CreateUser">
            <div class="modal-body pt-0">
              <div class="mb-0.5 flex gap-4 max-sm:flex-col">
                <div class="w-full">
                  <select class="select max-w-sm w-full" name="role_id" aria-label="Role">
                    ${await renderRoleOptions()}
                  </select>
                  <span class="helper-text text-end text-transparent">Error message</span>
                </div>
                <div class="w-full">
                  <select class="select max-w-sm w-full" name="company_id" aria-label="Company" id="companySelect">
                    ${await renderCompanyOptions()}
                  </select>
                  <span class="helper-text text-end text-transparent">Error message</span>
                </div>
              </div>

              <div class="mb-4">
                <label class="label-text" for="fullName">Full name</label>
                <input type="text" class="input" id="fullName" name="name" />
                <span class="helper-text text-end text-transparent">Error message</span>
              </div>

              <div class="mb-0.5 flex gap-4 max-sm:flex-col">
                <div class="w-full">
                  <label class="label-text" for="email">Email</label>
                  <input type="email" class="input" id="email" name="email" />
                  <span class="helper-text text-end text-transparent">Error message</span>
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
      
    </main>
  </div>
    `;
}


async function renderCompanyOptions() {
    const response = await getCompanies();

    if (response?.success && Array.isArray(response.data.data)) {
        let options = '<option value="" disabled selected>Select a company</option>';

        response.data.data.forEach((company) => {
            options += `<option value="${company.id}">${company.name}</option>`;
        });

        return options;
    } else {
        console.error("Failed to load companies");
        return '<option disabled selected>Error loading companies</option>';
    }
}

async function renderRoleOptions() {
    const response = await getRole();

    if (response?.success && Array.isArray(response.data.admins)) {
        let options = '<option value="" disabled selected>Select a role</option>';

        response.data.admins.forEach((role) => {
            options += `<option value="${role.role_id}">${role.title}</option>`;
        });

        return options;
    } else {
        console.error("Failed to load roles");
        return '<option disabled selected>Error loading roles</option>';
    }
}
