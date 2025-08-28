import { loginSchema } from "../schemas/loginSchema";
import resetErrors from "../utils/resetErrors";
import showErrors from "../utils/showErrors";
import { formDataToObject, validateForm } from "../utils/validateForm";


export default function loginFormHandler(e) {

  resetErrors(formDataToObject(e.target))

  const result = validateForm(loginSchema, e.target)
  
  if (!result.success) return showErrors(result.errors)
  
  console.log(result);

}