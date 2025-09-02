import { getCompanies } from "../services/companyService";
import { getRole } from "../services/roleService";
import { getUsers } from "../services/userService";
import Dashboard from "../components/Dashboard";


export async function renderUserTable() {
  const usersResponse = await getUsers();
  const companiesResponse = await getCompanies();
  const rolesResponse = await getRole();

  if (
    !usersResponse.success ||
    !Array.isArray(usersResponse.data.admins) ||
    !companiesResponse.success ||
    !Array.isArray(companiesResponse.data.data) ||
    !rolesResponse.success ||
    !Array.isArray(rolesResponse.data.admins)
  ) {
    return `<tr>
      <td colspan="5" class="text-error text-center">Error loading users, companies, or roles</td>
    </tr>`;
  }

  const users = usersResponse.data.admins;
  const companies = companiesResponse.data.data;
  const roles = rolesResponse.data.admins;

  if (users.length === 0) {
    return `<tr>
      <td colspan="5" class="text-center text-neutral">No users found</td>
    </tr>`;
  }

  const rows = users.map((user) => {
    const company = companies.find((c) => c.id === user.company_id);
    const companyName = company ? company.name : "Unknown";

    const role = roles.find((r) => r.role_id === user.role_id);
    const roleTitle = role ? role.title : "Unknown";

    return `
      <tr>
        <td>${roleTitle}</td>
        <td>${companyName}</td>
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
    `;
  }).join("");

  return rows;
}



async function CreateUser() {
  const userRows = await renderUserTable();

  return `
<button type="button" class="btn btn-primary mb-4" aria-haspopup="dialog" aria-expanded="false"
  aria-controls="form-modal" data-overlay="#form-modal">Create new user</button>

<div class="border-base-content/25 w-full rounded-lg border mb-8">
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>ROL</th>
          <th>COMPANY</th>
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
<div id="form-modal" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden" role="dialog"
  tabindex="-1">
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



export default async function UserDashboard() {
  const content = await CreateUser();
  return Dashboard(content);
}
