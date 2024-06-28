import { Icons } from "../components";

export const taskFrameView = async (task = null) => {
    const taskFrame = document.createElement('dialog');
    taskFrame.id = 'taskDialog';

    if (task) {
        dialog.innerHTML = `
        <header>
            <button id="close__dialog">
                <img src="${Icons.closeX}" alt="Cerrar diálogo">
            </button>
            <h2>Tarea</h2>
        </header>
        <form>
            <div>
                <label for="task__title">Título de la tarea</label>
                <input type="text" id="task__title" name="task__title" value="${task.title}" required>
            </div>
            <div>
                <button id="subtask__btn">Agregar sub-tarea</button>
                <ul id="subtasks__list">
                    ${task.subtasks.map(subtask => `
                        <li>
                        <input type="checkbox" id="subtask__1">
                        <label class="subtasks" for="subtask__1">${subtask.title}</label>
                    </li>
                        `).join('')}
                </ul>
            </div>
            <div>
                <label for="task__description">Grupos</label>
                <select name="task__group" id="task__group">
                    <option value="">Sin grupo</option>
                    <option value="1">Trabajo</option>
                    <option value="2">Personal</option>
                    <option value="3">Estudio</option>
                </select>
            </div>
            <div>
                <label for="task__due">Fecha</label>
                <input type="date" id="task__due" name="task__due">
            </div>
            <div>
                <label for="task__time">Hora</label>
                <input type="time" id="task__time" name="task__time">
            </div>

            <div>
                <label for="task_description">Notas</label>
                <textarea id="task__description" name="task__description"></textarea>
            </div>

            <button id="save__task">Guardar</button>
            <button id="cancel__task">Eliminar</button>
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
                    <option value="1" selected>Tareas</option>
                </select>
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
            <button id="save__task">Guardar</button>
            <button id="delete__task">Eliminar</button>
            </div>
        </form>

        
    `;
    }

    return taskFrame;
}