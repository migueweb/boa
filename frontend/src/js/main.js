import '../css/style.css'
import loginFormHandler from './handlers/loginFormHandler';
import Router from './router';
import routes from './routes';



const router = new Router(routes) // Initiation Router
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


app.addEventListener("submit", (e) => {
  e.preventDefault()
  
  if (e.target.matches("#loginForm")) return loginFormHandler(e)

  
})

router.loadRoute();
