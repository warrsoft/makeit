import { AppRoutes } from '../router/routes.js';
import Storage from '../storage/app-storage.js';
import { Icons } from '../components/index.js';

export const ProfileView = async (token) => {
    if (!token) {
        window.location.hash = AppRoutes.login;
        return;
    }

    document.title = 'Make It - Mi Perfil';

    const profileView = document.createElement('div');
    profileView.id = 'profile__section';

    const dialog = document.createElement('dialog');
    dialog.classList.add('avatar__dialog');

    const dialogTitle = document.createElement('h2');
    dialogTitle.textContent = 'Edita tu avatar';

    const dialogClose = document.createElement('button');
    dialogClose.classList.add('avatar__dialog--close');

    const dialogCloseIcon = document.createElement('img');
    dialogCloseIcon.src = Icons.closeX;

    dialogClose.appendChild(dialogCloseIcon);

    const dialogContent = document.createElement('div');
    dialogContent.classList.add('avatar__dialog--content');

    for (let i = 1; i <= 20; i++) {
        const avatarImg = document.createElement('img');
        avatarImg.src = `${Storage.imagesURL}/avatars/avatar${i}.webp`;
        avatarImg.alt = `Avatar ${i}`;
        avatarImg.classList.add('avatar__dialog--img');

        dialogContent.appendChild(avatarImg);
    }

    dialog.appendChild(dialogClose);
    dialog.appendChild(dialogTitle);
    dialog.appendChild(dialogContent);

    profileView.innerHTML = `
        <form class="signup__form">
            <div class="signup__form--avatar">
                <button class="avatar" selected="false">
                    <img src="/icons/User_01.svg" alt="Avatar">
                </button>
                <label class="avatar__label">Avatar</label>
                <span class="error__form--message"></span>
            </div>
            <div class="signup__form--group">
                <label for="email">Correo *</label>
                <input type="email" id="email" name="email" required>
                <span class="error__form--message"></span>
            </div>
            <div class="signup__form--group">
                <label for="name">Usuario *</label>
                <input type="text" id="name" name="name" required>
                <span class="error__form--message"></span>
            </div>
            <div class="signup__form--group">
                <label for="password">Clave *</label>
                <input type="password" id="password" name="password" required>
                <span class="error__form--message"></span>
            </div>
            <div class="signup__form--group">
                <label for="passwordConfirm">Confirmar Clave *</label>
                <input type="password" id="passwordConfirm" name="passwordConfirm" required>
                <span class="error__form--message"></span>
            </div>
            <div class="signup__form--group">
                <label for="answer">Respuesta *</label>
                <div class="answer__container">
                <input type="text" id="answer" name="answer">
                <button class="next__question--btn">Siguiente</button></div>
                <span class="error__form--message"></span>
            </div>
        </form>
    `;

    profileView.appendChild(dialog);

    return [profileView];
}