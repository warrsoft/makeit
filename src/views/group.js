import { AppRoutes } from "../router/routes.js";
import { Icons, NavBar } from "../components/index.js";
import Storage from "../storage/app-storage.js";

export const GroupView = async (token, group) => {
    if (!token) {
        window.location.hash = AppRoutes.login;
        return;
    }

    document.title = `Make It - ${group.description}`;

    const user = await Storage.getUserById(token);
    const groups = await Storage.getGroups(token);

    let tasks = [];

    let pendingTasks = [];
    let completedTasks = [];

    try {
        tasks = await Storage.getTasks(token);

        tasks = tasks.filter(task => {
            task.dueDate = task.dueDate ? new Date(task.dueDate) : null;
            task.group = group.color;
            if (task.groupId === group.id) {
                task.dueDate !== null ? task.dueDate = task.dueDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) : null;
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


    const groupView = document.createElement('div');
    groupView.innerHTML = `
        <div id="myday__section">
        ${pendingTasks.length === 0 ? completedTasks.length === 0 ? 'No tienes tareas en este grupo' : '' : ''}
            <div id="pending__tasks">
            ${pendingTasks.length === 0 ? ''
            : pendingTasks.map(task =>
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

    return [groupView];

}