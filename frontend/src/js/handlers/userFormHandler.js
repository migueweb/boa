import { createUser } from "../services/userService";
import { formDataToObject, validateForm } from "../utils/validateForm";
import showErrors from "../utils/showErrors";
import resetErrors from "../utils/resetErrors";
import { renderUserTable } from "../pages/user";
import {createUserSchema} from "../schemas/userSchema"

export default async function userFormHandler(e) {
  e.preventDefault();

  const form = e.target;

 
  resetErrors(formDataToObject(form));


  const result = validateForm(createUserSchema, form);

  if (!result.success) {
    showErrors(result.errors);
    return;
  }

  result.data.company_id = Number(result.data.company_id);

  const response = await createUser(result.data);

  console.log("Create user response:", response);

  if (!response.success) {
    showErrors(response.errors || [{ field: "general", message: "Error creating user" }]);
    return;
  }

  alert("User created successfully!");

  form.reset();

  const newRows = await renderUserTable();
  document.getElementById("user-table-container").innerHTML = newRows;
}
