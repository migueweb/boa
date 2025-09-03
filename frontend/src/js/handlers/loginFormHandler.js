import Auth from "../auth";
import { loginSchema } from "../schemas/loginSchema";
import { loginService } from "../services/authService";
import resetErrors from "../utils/resetErrors";
import showErrors from "../utils/showErrors";
import { formDataToObject, validateForm } from "../utils/validateForm";
import router from "../router";


export default async function loginFormHandler(e) {

  resetErrors(formDataToObject(e.target))

  const result = validateForm(loginSchema, e.target)

  if (!result.success) return showErrors(result.errors)

  const response = await loginService(result.data)

  console.log(response);

  if (!response.success) {
    showErrors(response.errors)
    return
  }

  // Log in user

  console.log(response); 

  const { user, permissions} = response.data

  Auth.login(user, permissions)

  router.navigate("/dashboard")

  return
}