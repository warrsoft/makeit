import Storage from '../storage/app-storage.js';

export const WelcomeView = () => {

    document.title = 'Make It - Welcome';

    const welcomeSection = document.createElement('section');
    welcomeSection.id = 'welcome__section';

    const welcomeTitle = document.createElement('div');
    welcomeTitle.classList.add('welcome__title');

    const welcomeTitleText = document.createElement('h1');
    welcomeTitleText.textContent = 'Make it';

    const welcomeTitleImage = document.createElement('img');
    welcomeTitleImage.src = `${Storage.imagesURL}/logo/makeit-logo.webp`;
    welcomeTitleImage.alt = 'Make it logo';

    welcomeTitle.append(welcomeTitleText, welcomeTitleImage);

    const welcomeBody = document.createElement('div');
    welcomeBody.classList.add('welcome__body');

    const welcomeBodyText = document.createElement('div');
    welcomeBodyText.classList.add('welcome__body--text');

    const welcomeBodyTextTitle = document.createElement('h2');
    welcomeBodyTextTitle.textContent = 'Bienvenido';

    const welcomeBodyTextDescription = document.createElement('p');
    welcomeBodyTextDescription.textContent = 'Vivimos para hacer tu vida más sencilla al ofrecerte la posibilidad de llevar el control de todas tus tareas desde un solo lugar, de la mejor manera.';

    welcomeBodyText.append(welcomeBodyTextTitle, welcomeBodyTextDescription);

    const welcomeBodyCta = document.createElement('div');
    welcomeBodyCta.classList.add('welcome__body--cta');

    const welcomeBodyCtaLogin = document.createElement('button');
    welcomeBodyCtaLogin.textContent = 'Iniciar Sesión';
    welcomeBodyCtaLogin.classList.add('login__button')

    const welcomeBodyCtaRegister = document.createElement('button');
    welcomeBodyCtaRegister.textContent = 'Registrarse';
    welcomeBodyCtaRegister.classList.add('signup__button');

    welcomeBodyCta.append(welcomeBodyCtaLogin, welcomeBodyCtaRegister);

    welcomeBody.append(welcomeBodyText, welcomeBodyCta);

    welcomeSection.append(welcomeTitle, welcomeBody);

    const firstCirclesDiv = document.createElement('div');
    const secondCirclesDiv = document.createElement('div');

    const firstCircle = document.createElement('div');
    firstCircle.classList.add('welcome__circle', 'first__circle');

    firstCircle.appendChild(firstCirclesDiv);

    const secondCircle = document.createElement('div');
    secondCircle.classList.add('welcome__circle', 'second__circle');

    secondCircle.appendChild(secondCirclesDiv);

    return [welcomeSection, firstCircle, secondCircle];

}