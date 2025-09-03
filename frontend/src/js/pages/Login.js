export default function Login() {
  return `
    <section class="h-dvh grid items-center justify-center bg-accent-content w-full">

      <form id="loginForm" class="bg-white p-4 rounded-md shadow grid gap-1">
        <div class="w-full">
          <label class="label-text" for="userEmail">Email</label>
          <input placeholder="user@example.com" class="input" id="userEmail" name="email" autocomplete="email"/>
          <span class="helper-text text-end text-transparent">Error message</span>
        </div>

        <div class="w-full">
          <label class="label-text" for="userPassword">Password</label>
          <input type="password"  class="input" id="userPassword" name="password"/>
          <span class="helper-text text-end text-transparent">Error message</span>
        </div>

        <button type="submit" class="btn btn-primary w-full">
          Log in
        </button>
      </form>
    </section>
  `
}