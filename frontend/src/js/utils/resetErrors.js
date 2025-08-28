/**
 * Resets validation error states for a set of form fields.
 *
 * This function removes the "is-invalid" class from each input,
 * clears its associated error message, and hides the error element
 * by re-adding the "text-transparent" class.
 *
 * @param {Object<string, any>} fields - An object containing field names as keys.
 *   The values can be any data, as only the keys are used to locate form inputs.
 *
 * @example
 * resetErrors({
 *   email: "",
 *   password: ""
 * });
 */
export default function resetErrors(fields) {

  Object.entries(fields).forEach(([name, value])=> {

    const input = document.querySelector(`[name="${name}"]`);

    input.classList.remove("is-invalid");
    
    const errorEl = input.nextElementSibling;

    if (errorEl) {
      errorEl.innerText = "here error message";
      errorEl.classList.add("text-transparent");
    }
  })
}