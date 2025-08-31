import '../css/style.css'
import userHandler from './handlers/userFormHandler';
import loginFormHandler from './handlers/loginFormHandler';
import router from './router';


const app = document.querySelector("#app")

/**
 * Managing anchors [data-route] for spa navigation
*/
document.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    e.preventDefault();
    router.navigate(e.target.getAttribute("href"));
  }
});


app.addEventListener("submit", async (e) => {
  e.preventDefault()
  
  if (e.target.matches("#loginForm")) return await loginFormHandler(e)
  if (e.target.matches("#CreateUser")) return await userHandler(e); 

  
})

router.loadRoute();
