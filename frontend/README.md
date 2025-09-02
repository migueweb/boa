# BOA - SPA client

## 📌 Introduction

This project is a **Single Page Application (SPA)** built with **Vite** as the bundler.  
It follows a **modular architecture** where responsibilities are split into distinct folders (routing, services, handlers, components, schemas, and utilities).  

The app handles **authentication, navigation, and form validation** on the client side while consuming backend APIs with **Axios**.  
It is styled with **TailwindCSS** and **FlyonUI**, with validation powered by **Zod**.

The main goals of the project are:
- Fast and modern dev experience with Vite.  
- Clean modular structure.  
- SPA navigation without full-page reloads.  
- Robust form handling with validation and error display.  
- Easy scalability for future features.

---

## 📂 Project Structure

The folder tree up to 3 levels:

```ruby
.
├── index.html                # Main entry point
├── package.json              # Project configuration and dependencies
├── public                    # Static assets
├── README.md                 # Project documentation
├── src
│   ├── css
│   │   └── style.css         # Global styles (Tailwind + custom)
│   └── js
│       ├── auth.js           # Authentication helper (localStorage/session logic)
│       ├── components        # UI components
│       ├── handlers          # Form + event handlers
│       ├── main.js           # Application bootstrap
│       ├── pages             # SPA pages
│       ├── router.js         # Router implementation
│       ├── routes.js         # Routes configuration
│       ├── schemas           # Zod validation schemas
│       ├── services          # Axios services (API calls)
│       └── utils             # Helper utilities
└── vite.config.js            # Vite configuration
```

---

## 📦 Dependencies

### Dev Dependencies
- **vite** – Fast bundler and dev server.  
- **@iconify-json/tabler** – Tabler icons JSON data.  
- **@iconify/tailwind4** – Iconify plugin for Tailwind.

### Dependencies
- **tailwindcss** – Utility-first CSS framework.  
- **@tailwindcss/vite** – Tailwind integration with Vite.  
- **flyonui** – UI components based on Tailwind.  
- **axios** – HTTP client for API requests.  
- **zod** – Validation library for schema-based form validation.  

##  Project set up.

1. Install the dependencies:
```bash
npm install
```

2. run the proeject:
```bash
npm run dev
``` 
3. remember to got the backend running in the port `3000`

---

## Code base explanation


### Application bootstraping
The application starts in **`main.js`**.

- Vite loads this file first.
- Global styles and libraries are imported here.
- The **Router** is initialized with the route definitions.
- The root container (`<div id="app"></div>`) in `index.html` is where all views are mounted.

```js
import router from './router';

router.loadRoute();
```
---

### Event handlers

Handlers are responsible for separating logic from the main app bootstrap.

+ `anchorHandler.js`: intercepts `<a>` clicks to use SPA navigation instead of full reloads.

+ `loginFormHandler.js`: processes login form submission, calls `Auth.login()`, and redirects.

+ `logoutHandler.js`: clears session via `Auth.logout()` and redirects to login.

---

### Router 

The router is defined in router.js.

It manages:

+ Navigation: Updates the browser history with pushState.
+ Authentication: Blocks access to protected routes if the user is not logged in.
+ Guest routes: Prevents authenticated users from accessing login/register pages.
+ Authorization: Checks if the user has the required permissions for certain routes.
+ History navigation: Supports browser back/forward with popstate.

---

### Routes Definition

Routes are declared in routes.js.

Each route entry can define:

- `view:` async function that returns the HTML for the page.

- `auth:` boolean → requires authentication.

- `guest:` boolean → only for non-authenticated users.

- `permissions:` array → required permissions. 

_*persmissions are setted in DB*_

**Example:**
```js
import Home from './pages/home.js';
import Dashboard from './pages/dashboard.js';
import Login from './pages/login.js';

export default {
  '/': { view: Home, guest: true },
  '/login': { view: Login, guest: true },
  '/dashboard': { view: Dashboard, auth: true, permissions: ['users_create'] },
  '/404': { view: () => '<h1>Page Not Found</h1>' }
};
```
---

### Views & Components

- **Views** = entire pages (home.js, dashboard.js, login.js).

- **Components** = reusable UI pieces (navbar, footer, buttons).

Each view exports a function returning HTML:

```js
export default async function Home() {
  return `
    <section>
      <h1>Welcome</h1>
      <p>This is the home page</p>
    </section>
  `;
}
```
--- 

## Form Handling Workflow

### 1. Overview
Forms in this app are handled through a **modular validation and error-handling system**.  
Each form has:
- A **handler** that coordinates validation and API calls.
- **Validation utilities** to enforce schema rules (Zod).
- **Error utilities** to reset or display errors in the UI.
- A **service wrapper** to standardize API responses.

This ensures:
- Consistent validation across forms.
- Reusable error-handling logic.
- Clean separation of concerns between UI and data flow.

---

### 2. Form Lifecycle

#### Step 1 — Event Capture
Forms are intercepted in `main.js` via `submit` events:

```js
app.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  if (e.target.matches("#loginForm")) {
    return await loginFormHandler(e); // Delegates to form handler
  }
});
```

---

#### Step 2 — Reset Previous Errors
`resetErrors(fields)` clears error states before validating new input.

```js
resetErrors(formDataToObject(e.target));
```

- Removes `is-invalid` class.
- Clears previous error messages.
- Hides error labels by restoring `text-transparent`.

---

#### Step 3 — Validate Input
Validation uses **Zod schemas**.

```js
const result = validateForm(loginSchema, e.target);
```

- Converts form to object (`formDataToObject`).
- Validates against schema (`loginSchema`).
- Returns either:
  ```js
  { success: true, data }
  ```
  or
  ```js
  { success: false, errors }
  ```

If validation fails → errors are displayed via `showErrors()`.

---

#### Step 4 — API Request
If validation succeeds, the form handler calls a service function.

```js
const response = await loginService(result.data);
```

Services are wrapped by `serviceHandler()` to normalize responses:

```js
// Success
{ success: true, data }

// Error
{ success: false, errors }
```

---

#### Step 5 — Show API Errors (if any)
If the API responds with errors, they are mapped to form fields and displayed:

```js
if (!response.success) {
  showErrors(response.errors);
  return;
}
```

---

#### Step 6 — Handle Success
On success:
- User is authenticated via `Auth.login(user, permissions)`.
- Router redirects to `/dashboard`.

```js
const { user, permissions } = response.data;
Auth.login(user, permissions);
router.navigate("/dashboard");
```

---

### 3. Utilities Reference

#### `resetErrors(fields)`
Clears error states for form fields.

```js
resetErrors({ email: "", password: "" });
```

#### `formDataToObject(form)`
Converts a form into an object:

```js
// <input name="email" value="a@b.com">
formDataToObject(form); 
// => { email: "a@b.com" }
```

#### `validateForm(schema, form)`
Validates form data with Zod.

```js
const result = validateForm(loginSchema, form);
```

#### `showErrors(errors)`
Displays validation/API errors in the UI.

```js
showErrors([
  { field: "email", message: "Email is required" }
]);
```

#### `serviceHandler(requestFn)`
Standardizes API responses.

```js
const result = await serviceHandler(() => api.post("/login", data));
```

