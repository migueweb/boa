import '../css/style.css'
import "flyonui/flyonui.js";
import Router from './router';
import routes from './routes';


const router = new Router(routes) // Initiation Router

/**
 * Managing anchors [data-route] for spa navigation
*/
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-route]")) {
    e.preventDefault();
    router.navigate(e.target.getAttribute("href"));
  }
});

router.loadRoute();
