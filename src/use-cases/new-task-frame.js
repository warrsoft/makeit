import { Icons } from "../components";
import Storage from "../storage/app-storage.js";

export const taskFrameView = async (task = null) => {
    const taskFrame = document.createElement('dialog');
    const oldDialog = document.getElementById('taskDialog');
    if (oldDialog) {
        oldDialog.remove();
    }
    taskFrame.id = 'taskDialog';

    const token = Storage.getFromStorage('token');
    const currentGroup = Storage.getFromStorage('currentGroup');

    const groups = await Storage.getGroups(token);
    
    if (task) {
        const dueYear = new Date(task.dueDate).getFullYear();
        const dueMoth = new Date(task.dueDate).getMonth();
        const dueDay = new Date(task.dueDate).getDate();
    
        const dueHours = new Date(task.dueDate).getHours();
        const dueMinutes = new Date(task.dueDate).getMinutes();
    
        const date = `${dueYear}-${dueMoth < 10 ? '0' + (dueMoth+1) : (dueMoth+1)}-${dueDay < 10 ? '0' + dueDay : dueDay}`;
    
        const time = `${dueHours < 10 ? '0' + dueHours : dueHours}:${dueMinutes < 10 ? '0' + dueMinutes : dueMinutes}`;

        Object.keys(task).forEach((key) => {
            if (task[key] === null) task[key] = '';
        });

        taskFrame.innerHTML = `
        <header class="frame__header">
            <button class="close__frame--btn">
                <img src="${Icons.closeX}" alt="Cerrar diálogo">
            </button>
            <h2>Tarea</h2>
            <div class="frame__header--circle frame__header--circle--first"><div></div></div>
            <div class="frame__header--circle frame__header--circle--second"><div></div></div>
        </header>
        <form class="frame__form">
            <div class="frame__task ${task.statusId === 2 ? 'completed' : ''}">
                <label for="task__title">Título de la tarea</label>
                <div class="task__input">
                <input type="text" id="task__title" name="task__title" placeholder="Título de la tarea" value="${task.title}">
                <button class="task--frame__completed--btn">
                        <img src="${Icons.check}" alt="Completar tarea">
                    </button></div>
                    <span class="task__error"></span>
            </div>
            <div class="frame__subtasks">
                <ul class="subtasks__list">
                    ${task.subtasks.map(subtask => `
                            <li class="subtask" ${subtask.statusId === 2 ? 'class="completed"' : ''} id="${subtask.id}">
                            <button class="subtask__completed--btn">
                    <img src="${Icons.check}" alt="Subtarea completada">
                </button>
                <input type="text" class="subtask__info" value="${subtask.title}">
                            </li>
                        `).join('')}
                </ul>
                <button id="subtask__new--btn">
                <img src="${Icons.listChecklist}" alt="Agregar sub-tarea">	
                Agregar sub-tarea
                </button>
            </div>
            <div class="frame__groups">
                <label for="task__group--title">Grupos</label>
                <select name="task__group--list" id="task__group">
                    ${groups.map(group => `
                        <option value="${group.id}" ${task.groupId === group.id ? 'selected' : ''}>${group.description}</option>
                        `).join('')}
                </select>
            </div>
            <div class="frame__myday">
                <label for="task__myday">Agregar a mi día</label>
                <input type="checkbox" id="task__myday" name="task__myday" ${task.myDay ? 'checked' : ''}>
            </div>
            <div class="frame__datetime">
                <div class="date__container">
                <label for="task__due">Fecha</label>
                <input value="${date}" type="date" id="task__due" name="task__due"></div>
                <div class="time__container">
                <label for="task__time">Hora</label>
                <input value="${time}" type="time" id="task__time" name="task__time">
            </div>
            </div>
            

            <div class="frame__description">
                <label for="task_description">Notas</label>
                <textarea id="task__description" name="task__description" placeholder="Notas">${task.description}</textarea>
            </div>

            <div class="task__ctas">
            <button class="save__task--btn">Guardar</button>
            <button class="delete__task--btn">Eliminar</button>
            </div>
        </form>
    `;
    } else {
        taskFrame.innerHTML = `
        <header class="frame__header">
            <button class="close__frame--btn">
                <img src="${Icons.closeX}" alt="Cerrar diálogo">
            </button>
            <h2>Tarea</h2>
            <div class="frame__header--circle frame__header--circle--first"><div></div></div>
            <div class="frame__header--circle frame__header--circle--second"><div></div></div>
        </header>
        <form class="frame__form">
            <div class="frame__task">
                <label for="task__title">Título de la tarea</label>
                <div class="task__input">
                <input type="text" id="task__title" name="task__title" placeholder="Título de la tarea">
                <button class="task--frame__completed--btn">
                        <img src="${Icons.check}" alt="Completar tarea">
                    </button></div>
                    <span class="task__error"></span>
            </div>
            <div class="frame__subtasks">
                <ul class="subtasks__list">
                    
                </ul>
                <button id="subtask__new--btn">
                <img src="${Icons.listChecklist}" alt="Agregar sub-tarea">	
                Agregar sub-tarea
                </button>
            </div>
            <div class="frame__groups">
                <label for="task__group--title">Grupos</label>
                <select name="task__group--list" id="task__group">
                    ${groups.map(group => `
                        <option value="${group.id}" ${currentGroup == group.id ? 'selected' : ''}>${group.description}</option>
                        `).join('')}
                </select>
            </div>
            <div class="frame__myday">
                <label for="task__myday">Agregar a mi día</label>
                <input type="checkbox" id="task__myday" name="task__myday">
            </div>
            <div class="frame__datetime">
                <div class="date__container">
                <label for="task__due">Fecha</label>
                <input type="date" id="task__due" name="task__due"></div>
                <div class="time__container">
                <label for="task__time">Hora</label>
                <input type="time" id="task__time" name="task__time">
            </div>
            </div>
            

            <div class="frame__description">
                <label for="task_description">Notas</label>
                <textarea id="task__description" name="task__description" placeholder="Notas"></textarea>
            </div>

            <div class="task__ctas">
            <button class="save__task--btn">Guardar</button>
            <button class="delete__task--btn">Eliminar</button>
            </div>
        </form>

        
    `;
    }

    return taskFrame;
}