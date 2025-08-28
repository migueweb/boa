export default function resetErrors(fields) {

  Object.entries(fields).forEach(([name, value])=> {

    const input = document.querySelector(`[name="${name}"]`);

    input.classList.remove("is-invalid");
    
    const errorEl = input.nextElementSibling;

    if (errorEl) {
      errorEl.innerText = "here error message";
      errorEl.classList.add("text-transparent");
    }
  })
}