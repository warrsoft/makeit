import Storage from '../storage/app-storage.js';
import { Icons } from '../components/index.js';

export const SignupView = async (token) => {

    const navbar = document.querySelector('#navbar');
    if (!token && navbar) navbar.remove();

    document.title = 'Make It - Regístrate'

    const signupView = document.createElement('div');
    signupView.id = 'signup__section';

    const dialog = document.createElement('dialog');
    dialog.classList.add('avatar__dialog');

    const dialogTitle = document.createElement('h2');
    dialogTitle.textContent = 'Selecciona tu avatar';

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

    let questions = [];

    await Storage.getQuestions()
        .then((data) => {
            if (data) questions = data;
        }).catch (error => {
            console.log('Error getting the questions from the server...', error);
        });
    
    signupView.innerHTML = `
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
                <input type="email" id="email" name="email" required autocomplete="off">
                <span class="error__form--message"></span>
            </div>
            <div class="signup__form--group">
                <label for="name">Usuario *</label>
                <input type="text" id="name" name="name" required autocomplete="off">
                <span class="error__form--message"></span>
            </div>
            <div class="signup__form--group">
                <label for="password">Clave *</label>
                <input type="password" id="password" name="password" required autocomplete="off">
                <span class="error__form--message"></span>
            </div>
            <div class="signup__form--group">
                <label for="passwordConfirm">Confirmar Clave *</label>
                <input type="password" id="passwordConfirm" name="passwordConfirm" required autocomplete="off">
                <span class="error__form--message"></span>
            </div>
            <div class="signup__form--group">
                <label for="question">Preguntas de Seguridad *</label>
                <span style="font-size: .75rem;">Debe seleccionar 3 preguntas de seguridad</span>
                <select name="questions" id="questions">
                <option value="0">Selecciona una pregunta de seguridad</option>
                ${questions.map(question => `<option value="${question.id}">${question.description}</option>`)}
            </select>
            <span class="error__form--message"></span>
            </div>
            <div class="signup__form--group">
                <label for="answer">Respuesta *</label>
                <div class="answer__container">
                <input type="text" id="answer" name="answer" autocomplete="off">
                <button class="next__question--btn">Siguiente</button></div>
                <span class="error__form--message"></span>
            </div>
        </form>
    `;

    signupView.appendChild(dialog);

    return [signupView];
}