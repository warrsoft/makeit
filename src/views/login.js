import Storage from '../storage/app-storage.js';

export const LoginView = (token) => {

    const navbar = document.querySelector('#navbar');
    if (!token && navbar) navbar.remove();

    Storage.setToStorage('userId', '')

    document.title = 'Make It - Inicio de Sesión';

    const loginView = document.createElement('div');
    loginView.id = 'login__section';

    loginView.innerHTML = `
       <form class="login__form">
        <div class="login__form--group">
            <label for="email">Correo o Usuario</label>
            <input type="text" id="name" name="name" required autocomplete="off">
            <span class="error__form--message"></span>
        </div>
        <div class="login__form--group">
            <label for="password">Clave de Acceso</label>
            <input type="password" id="password" name="password" required>
            <span class="error__form--message"></span>
        </div>
       </form>
    `;

    const loginForget = document.createElement('a');
    loginForget.classList.add('login__forget');
    loginForget.textContent = 'Olvidé mi clave';
    loginView.appendChild(loginForget);

    return [loginView];
}