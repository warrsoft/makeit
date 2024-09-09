import Storage from '../storage/app-storage.js';
import { Icons } from '../components/index.js';

export const SettingsView = (token) => {
    const navbar = document.querySelector('#navbar');
    if (!token && navbar) navbar.remove();

    document.title = 'Make It - Configuración'

    const settingView = document.createElement('div');
    settingView.id = 'settings__section';

    settingView.innerHTML = `
       <ul class="settings__list">
        <li class="profile__btn">Editar Pefil</li>
        <li class="mygroups__btn">Mis grupos</li>
       </ul>
    `;

    return [settingView];
}