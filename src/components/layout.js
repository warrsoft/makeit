import { Icons } from './icons.js';

/**
 * 
 * @param {Object<Icons>} headerButtonType 
 * @param {String} title 
 * @param {Boolean} currentDate 
 * @param {String} footerFirstBtn 
 * @param {String} footerSecondBtn 
 * @returns 
 */

export const Layout = (headerButton, title, currentDate = false, footerFirstBtn, footerSecondBtn) => {
    const layout = document.createElement('div');
    layout.classList.add('layout');

    const header = document.createElement('header');
    header.classList.add('layout__header')

    const body = document.createElement('div');
    body.classList.add('layout__body');

    const main = document.createElement('main');
    main.classList.add('layout__body--main');

    const footer = document.createElement('footer');
    footer.classList.add('layout__body--footer');

    const headerFirstCircle = document.createElement('div');
    headerFirstCircle.classList.add('layout__header--circle', 'layout__header--circle--first');

    const first = document.createElement('div');
    headerFirstCircle.appendChild(first);

    const headerSecondCircle = document.createElement('div');
    headerSecondCircle.classList.add('layout__header--circle', 'layout__header--circle--second');

    const second = document.createElement('div');
    headerSecondCircle.appendChild(second);

    const headerBtn = document.createElement('button');
    headerBtn.classList.add('layout__header--button');
    
    const headerBtnIcon = document.createElement('img');
    headerBtnIcon.src = headerButton;

    headerBtn.appendChild(headerBtnIcon);

    const headerDate = document.createElement('span');

    if (currentDate) {
        headerDate.classList.add('layout__header--date');
        headerDate.textContent = new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const headerTitle = document.createElement('h1');
    headerTitle.classList.add('layout__header--title');
    headerTitle.textContent = title;

    if(footerFirstBtn) {
        const footerBtn1 = document.createElement('button');
        footerBtn1.classList.add('layout__footer--button', 'layout__footer--button--primary');
        footerBtn1.textContent = footerFirstBtn;
        footer.appendChild(footerBtn1);
    }

    if(footerSecondBtn) {
        const footerBtn2 = document.createElement('button');
        footerBtn2.classList.add('layout__footer--button', 'layout__footer--button--secondary');
        footerBtn2.textContent = footerSecondBtn;
        footer.appendChild(footerBtn2);
    }

    if(currentDate) header.appendChild(headerDate);
    header.append(headerBtn, headerTitle, headerFirstCircle, headerSecondCircle);
    body.append(main, footer);
    layout.append(header, body);

    return layout;
}