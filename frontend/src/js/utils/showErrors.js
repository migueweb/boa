/**
 * Displays validation errors for form fields.
 *
 * This function applies the "is-invalid" class to the input elements
 * corresponding to the provided error objects and shows the associated
 * error messages in the element immediately following the input.
 *
 * @param {Array<{field: string, message: string}>} errors - An array of error objects.
 *   Each object must contain the field name (to locate the input) and the
 *   corresponding error message to display.
 *
 * @example
 * showErrors([
 *   { field: "email", message: "Email is required" },
 *   { field: "password", message: "Password must be at least 6 characters" }
 * ]);
 */
export default function showErrors(errors) {
  errors.forEach(({field, message}) => {
    
    const input = document.querySelector(`[name="${field}"]`);

    input.classList.add("is-invalid")

    const errorEl = input?.nextElementSibling; 

    if (errorEl) {
      errorEl.innerText = message;
      errorEl.classList.remove("text-transparent")
    }
  });
}