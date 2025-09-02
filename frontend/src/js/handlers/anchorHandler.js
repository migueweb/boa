import router from "../router";

export default function anchorHandler(event) {
  event.preventDefault();
  router.navigate(event.target.getAttribute("href"));
  return
}