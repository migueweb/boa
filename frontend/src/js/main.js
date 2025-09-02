import '../css/style.css'

import userHandler from './handlers/userFormHandler';
import anchorHandler from './handlers/anchorHandler';
import loginFormHandler from './handlers/loginFormHandler';
import logoutHandler from './handlers/logoutHandler';
import router from './router';


const app = document.querySelector("#app")

/**
 * Managing anchors for spa navigation
*/
document.addEventListener("click", (e) => {
  e.preventDefault()
  if (e.target.matches("a")) return anchorHandler(e)
  if (e.target.matches("#logoutBtn")) return logoutHandler()
});


app.addEventListener("submit", async (e) => {
  e.preventDefault()
  
  if (e.target.matches("#loginForm")) return await loginFormHandler(e)
  if (e.target.matches("#CreateUser")) return await userHandler(e); 
  
})

router.loadRoute();
