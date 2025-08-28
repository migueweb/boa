export default function showErrors(errors) {
  errors.forEach(({field, message}) => {
    
    const input = document.querySelector(`[name="${field}"]`);

    input.classList.add("is-invalid")

    const errorEl = input?.nextElementSibling; 

    if (errorEl) {
      errorEl.innerText = message;
      errorEl.classList.remove("text-transparent")
    }
  });
}