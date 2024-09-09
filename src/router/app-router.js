import { AppRoutes } from "./routes.js";
import { WelcomeView, LoginView, SignupView, NotFoundView, LoadingView, MyDayView, GroupView, SettingsView, ProfileView, MyGroupsView } from '../views/index.js';
import { Layout, Icons } from "../components/index.js";
import { renderView, renderEventListeners } from "../use-cases/index.js";
import Storage from "../storage/app-storage.js";

let appContainer = null;

window.onhashchange = () => {
    AppRouter();
}

export const AppRouter = async (app) => {

    
    if (!appContainer) {
        appContainer = document.querySelector(app);
    }
    
    appContainer.appendChild(LoadingView());

    const currentHash = window.location.hash ? window.location.hash : AppRoutes.welcome;

    location.hash = currentHash;

    const token = Storage.getFromStorage('token');
    const currentGroup = Storage.getFromStorage('currentGroup');

    switch (currentHash) {
        case AppRoutes.welcome:
            renderView(null, ...[WelcomeView(token)], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.welcome);
                });
            break;
        case AppRoutes.login:
            if(Storage.getFromStorage('token')) {
                location.hash = AppRoutes.myday;
                return;
            }
            renderView(Layout(Icons.backArrow, 'Inicia Sesión', false, 'Acceder'), ...[LoginView(token)], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.login);
                });
            break;
        case AppRoutes.forget:
            appContainer.innerHTML = 'Forget';
            break;
        case AppRoutes.signup:
            renderView(Layout(Icons.backArrow, 'Regístrate', false, 'Registrarse'), ...[await SignupView(token)], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.signup);
                });
            break;
        case AppRoutes.myday:
            renderView(Layout(Icons.menu, 'Mi Día', true, 'Nueva Tarea'), ...[await MyDayView(token)], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.myday);
                });
            break;
        case AppRoutes.group:
            if (!currentGroup) {
                renderView(null, ...[NotFoundView(token)], appContainer);
                return;
            }
            const group = Storage.getGroupById(currentGroup);
            group.then(async group => {
                renderView(Layout(Icons.menu, group[0].description, false, 'Nueva Tarea'), ...[await GroupView(token, group[0])], appContainer)
                    .then(() => {
                        renderEventListeners(AppRoutes.group);
                    });
            })
            break;
        case AppRoutes.settings:
            renderView(Layout(Icons.backArrow, 'Configuración', false, '', 'Cerrar Sesión'), ...[SettingsView(token)], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.settings);
                });
            break;
        case AppRoutes.profile:
            renderView(Layout(Icons.backArrow, 'Perfil', false, 'Guardar Cambios'), ...[await ProfileView(token)], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.profile);
                });
            break;
        case AppRoutes.mygroups:
            renderView(Layout(Icons.backArrow, 'Mis Grupos', false, 'Guardar Cambios'), ...[await MyGroupsView(token)], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.mygroups);
                });
            break
        default:
            renderView(null, ...[NotFoundView(token)], appContainer);
            break;
    }

}