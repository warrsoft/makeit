import { AppRoutes } from "../router/routes.js";
import { Icons } from "../components/index.js";
import Storage from "../storage/app-storage.js";

export const MyDayView = async (token) => {

    if (!token) {
        window.location.hash = AppRoutes.login;
    }

    let tasks = [];
    let groups = [];

    let pendingTasks = [];
    let completedTasks = [];

    try {
        tasks = await Storage.getTasks(token);
        groups = await Storage.getGroups(token);

        pendingTasks = tasks.filter(task => task.statusId === 1);
        completedTasks = tasks.filter(task => task.statusId === 2);
    } catch {
        console.error('Error fetching tasks or groups');
    }

    const myDay = document.createElement('div');
    myDay.innerHTML = `
        <div id="myday__section">
        ${pendingTasks.length === 0 ? completedTasks.length === 0 ? 'Aún no tienes tareas, crea tu primera tarea': '' : ''}
            <div id="pending__tasks">
            ${pendingTasks.length === 0 ? '' : ''}
            ${pendingTasks.map(task =>
        `<article class="task" id="${task.id}">
                    <div class="task__group--color"></div>
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
                    `<article class="task completed" id="${task.id}">
                    <div class="task__group--color"></div>
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