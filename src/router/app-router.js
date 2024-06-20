import { AppRoutes } from "./routes.js";
import { WelcomeView, LoginView, SignupView, NotFoundView, LoadingView, MyDayView } from '../views/index.js';
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

    switch (currentHash) {
        case AppRoutes.welcome:
            renderView(null, ...[WelcomeView()], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.welcome);
                });
            break;
        case AppRoutes.login:
            renderView(Layout(Icons.backArrow, 'Inicia Sesión', false, 'Acceder'), ...[LoginView()], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.login);
                });
            break;
        case AppRoutes.forget:
            appContainer.innerHTML = 'Forget';
            break;
        case AppRoutes.signup:
            renderView(Layout(Icons.backArrow, 'Regístrate', false, 'Registrarse'), ...[await SignupView()], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.signup);
                });
            break;
        case AppRoutes.myday:
            const token = Storage.getFromStorage('token');
            renderView(Layout(Icons.menu, 'Mi Día', true, 'Nueva Tarea'), ...[await MyDayView(token)], appContainer)
                .then(() => {
                    renderEventListeners(AppRoutes.myday);
                });
            break;
        default:
            renderView(null, ...[NotFoundView()], appContainer);
            break;
    }

}