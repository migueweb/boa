/**
 * Converts form data into a plain JavaScript object.
 *
 * This function takes a HTMLFormElement, extracts its fields,
 * and returns an object where keys are input names and values
 * are the corresponding form values.
 *
 * @param {HTMLFormElement} form - The form element to extract data from.
 * @returns {Object<string, FormDataEntryValue>} An object containing the form data.
 *
 * @example
 * // Given <form><input name="email" value="a@b.com"></form>
 * const obj = formDataToObject(myForm);
 * // => { email: "a@b.com" }
 */
export function formDataToObject(form) {
  return Object.fromEntries(new FormData(form));
}

/**
 * Validates form data against a Zod schema.
 *
 * This function converts the given form into an object, validates it
 * using the provided Zod schema, and returns either a success result
 * with the validated data or a failure result with structured errors.
 *
 * @param {ZodSchema} schema - The Zod schema to validate against.
 * @param {HTMLFormElement} form - The form element to validate.
 * @returns {{
 *   success: true,
 *   data: any
 * } | {
 *   success: false,
 *   errors: Array<{ field: string, message: string }>
 * }} Validation result object.
 *
 * @example
 * const result = validateForm(loginSchema, myForm);
 * if (!result.success) {
 *   showErrors(result.errors);
 * }
 */
export function validateForm(schema, form) {
  const data = formDataToObject(form);

  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map(err => {
      return {
        field: err.path[0],
        message: err.message
      }
    })
    return { success: false, errors: errors };
  }

  return { success: true, data: result.data };
}