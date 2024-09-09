import { Icons } from "./icons";

export const NavBar = (user, groups) => {
    const defaultGroup = groups.find(group => group.id === 1);
    groups = groups.filter(group => group.id !== 1);
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    const navbar = document.createElement('div');
    navbar.id = 'navbar';
    navbar.innerHTML = `
            <div class="navbar__header">
                <button class="settings--btn"><img src="${Icons.Settings}"></button>
                <div class="navbar__header--userinfo">
                    <span>${user.name}</span>
                    <img src="${user.avatar}" alt="user avatar">
                </div>
            </div>
            <nav class="navbar__list">
                <div class="navbar__default--groups">
                <h2>Grupos</h2>
                <ul class="navbar__group--list">
                    <div id="0" class="navbar__group">
                        <figure class="navbar__group--color" style="background-color: var(--primary)"></figure>
                        <li class="navbar__group--text">Mi día</li>
                    </div>
                    <div id="${defaultGroup.id}" class="navbar__group">
                        <figure class="navbar__group--color" style="background-color: ${defaultGroup.color}"></figure>
                        <li class="navbar__group--text">${defaultGroup.description}</li>
                    </div>
                </ul>
                </div>
                <div class="navbar__user--groups">
                <h2>Mis grupos</h2>
                <ul class="navbar__group--list custome__groups">
                    ${groups.map(group =>
                        `<div id="${group.id}" class="navbar__group">
                            <figure class="navbar__group--color" style="background-color: ${group.color}"></figure>
                            <li class="navbar__group--text">${group.description}</li>
                        </div>`
                    ).join('')}
                </ul>
                </div>
            </nav>
            <div class="navbar__footer">
                <button class="navbar__footer--add__group--btn">
                <span>Crear nuevo grupo</span>
                <img src="${Icons.AddGroup}" alt="Agregar grupo">
                </button>
                <button class="navbar__footer--signout--btn">Cerrar Sesión</button>
            </div>
    `;
    return [ navbar, overlay ];
    
}