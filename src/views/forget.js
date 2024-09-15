import Storage from '../storage/app-storage.js';

export const ForgetView = async () => {

    document.title = 'Make It - Olvidé mi clave';

    const forgetView = document.createElement('div');
    forgetView.id = 'forget__section';

    const userId = Storage.getFromStorage('userId');

    let user = []

    if(userId) {
        user = await Storage.getUserQuestion(userId)
    }

    forgetView.innerHTML = `
        <form class="forget__form">
            <div class="forget__form--group">
                <label>Nombre de usuario</label>
                <input value="${user.name}" disabled>
            </div>
            <div class="forget__form--group">
                <label for="email">Correo electrónico</label>
                <input type="email" id="email" name="email" required autocomplete="off">
                <span class="error__form--message"></span>
            </div>
            <div class="forget__form--group">
                <label for="firstQuestion">${user.firstQuestion}</label>
                <input type="text" id="firstQuestion" name="firstQuestion" required autocomplete="off">
                <span class="error__form--message"></span>
            </div>
            <div class="forget__form--group">
                <label for="secondQuestion">${user.secondQuestion}</label>
                <input type="text" id="secondQuestion" name="secondQuestion" required autocomplete="off">
                <span class="error__form--message"></span>
            </div>
            <div class="forget__form--group">
                <label for="thirdQuestion">${user.thirdQuestion}</label>
                <input type="text" id="thirdQuestion" name="thirdQuestion" required autocomplete="off">
                <span class="error__form--message"></span>
            </div>
            <div class="forget__form--group">
                <label for="password">Nueva clave</label>
                <input type="password" id="password" name="password" required autocomplete="off">
                <span class="error__form--message"></span>
            </div>
            <div class="forget__form--group">
                <label for="confirmPassword">Confirmar nueva clave</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required autocomplete="off">
                <span class="error__form--message"></span>
            </div>
        </form>
    `;

    return [forgetView];
}