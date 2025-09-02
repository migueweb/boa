// Dashboard.js (no cambia nada aquí, solo sidebar)
import Auth from "../auth"

export default function Dashboard(children) {
  const user = Auth.getUser()
  let userRoleIcon

  if(user.role === "Super Administrator") {
    userRoleIcon = "tabler--crown"
  } else if (user.role === "Admin") {
    userRoleIcon = "tabler--shield"
  } else {
    userRoleIcon = "tabler--user"
  }

  return `
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
            ${user.role === "Admin" ? "Staff" : "Users"}
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
          Boa ecosystem
        </a>
      </div>
      <div class="navbar-end items-center gap-4 ">
        <span class=" badge badge-soft badge-secondary">
          <span class="icon-[${userRoleIcon}] size-5"></span>
        </span>
        <span class="badge badge-soft">${user.name}</span>
        <button class="btn btn-outline btn-primary waves waves-primary" id="logoutBtn">Log out</button>
      </div>
    </nav>
    <main class="p-2 w-full">
      ${children}
    </main>
  </div>
`
}
