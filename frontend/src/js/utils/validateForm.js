export function formDataToObject(form) {
  return Object.fromEntries(new FormData(form));
}

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