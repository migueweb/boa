import '../css/style.css'
import anchorHandler from './handlers/anchorHandler';
import loginFormHandler from './handlers/loginFormHandler';
import logoutHandler from './handlers/logoutHandler';
import router from './router';
import userFormHandler from "./handlers/userFormHandler"


const app = document.querySelector("#app")


document.addEventListener("click", (e) => {
  if (e.target.matches("a")) return anchorHandler(e)  //handling anchors for spa navigation
  if (e.target.matches("#logoutBtn")) return logoutHandler() // handling logout btn
});


app.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (e.target.matches("#loginForm")) return await loginFormHandler(e)
  if (e.target.matches("#CreateUser")) return await userFormHandler(e)

})

router.loadRoute();
