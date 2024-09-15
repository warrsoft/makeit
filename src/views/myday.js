import { AppRoutes } from "../router/routes.js";
import { Icons, NavBar } from "../components/index.js";
import Storage from "../storage/app-storage.js";

export const MyDayView = async (token) => {

    if (!token) {
        window.location.hash = AppRoutes.login;
        return;
    }

    document.title = 'Make It - Mi Día';

    const user = await Storage.getUserById(token);

    let tasks = [];
    let groups = [];

    let pendingTasks = [];
    let completedTasks = [];

    try {
        tasks = await Storage.getTasks(token);
        groups = await Storage.getGroups(token);

        tasks = tasks.filter(task => {
            task.dueDate = task.dueDate ? new Date(task.dueDate) : null;
            const endDay = new Date().setHours(23, 59, 59, 999);
            const yesterday = new Date().setHours(0, 0, 0, 0);
            const group = groups.find(group => group.id === task.groupId);
            task.group = group.color;
            if (task.dueDate != null && task.dueDate <= endDay && task.dueDate >= yesterday) {
                task.dueDate = task.dueDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
                return task;
            }
            if (task.myDay === 1) {
                task.dueDate = task.dueDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
                return task;
            }
        });

        pendingTasks = tasks.filter(task => task.statusId === 1) || [];
        completedTasks = tasks.filter(task => task.statusId === 2) || [];
    } catch {}

    const [navbar, overlay] = NavBar(user, groups);
    const app = document.getElementById('app');
    const navbarElement = document.getElementById('navbar');
    const overlayElement = document.getElementById('overlay');
    if (!navbarElement || !overlayElement) {
        app.insertAdjacentElement('afterend', overlay);
        app.insertAdjacentElement('afterend', navbar);
    } else {
        Storage.updateNavbarGroups(groups);
    }

    const myDay = document.createElement('div');
    myDay.innerHTML = `
        <div id="myday__section">
        ${pendingTasks.length === 0 ? completedTasks.length === 0 ? 'No tienes tareas para hoy' : '' : ''}
            <div id="pending__tasks">
            ${pendingTasks.length === 0 ? '' : pendingTasks.map(task =>
        `<article class="task" id="${task.id}">
                    <div class="task__group--color" style="background-color: ${task.group}";></div>
                    <div class="task__info">
                        <h3 class="task__title">${task.title}</h3>
                        ${task.dueDate ? `<time class="task__datetime" datetime="1914-12-20">${task.dueDate}</time>`
            : ''}
                    </div>
                    <button class="task__completed--btn">
                        <img src="${Icons.check}" alt="Completar tarea">
                    </button>
                </article>`
    ).join('')}
            </div>
            ${completedTasks.length === 0 ? '' :
            `<section class="task__completed--section">
                <button class="dropdown__btn">
                    <h2>Completadas</h2>
                    <img src="${Icons.dropdown}" alt="Desplegar tareas completadas">
                </button>
                
                <div id="completed__tasks" class="hidden">
                ${completedTasks.map(task =>
                `<article class="task completed" id="${task.id}" >
                    <div class="task__group--color" style="background-color: ${task.group}";></div>
                    <div class="task__info">
                        <h3 class="task__title">${task.title}</h3>
                        ${task.dueDate ? `<time class="task__datetime" datetime="1914-12-20">${task.dueDate}</time>`
                    : ''}
                    </div>
                    <button class="task__completed--btn">
                        <img src="${Icons.check}" alt="Completar tarea">
                    </button>
                </article>`
            ).join('')}

                </div>
                </section>
                `
        }
                
        </div>
    `;

    return [myDay];
}