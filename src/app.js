import { AppRouter } from "./router/app-router.js";

export const App = (app) => {
    (() => {
        AppRouter(app);
    })();
}