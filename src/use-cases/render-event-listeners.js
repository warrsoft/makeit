import { AppRoutes } from '../router/routes.js';
import Storage from '../storage/app-storage.js';
import { taskFrameView } from './new-task-frame.js';
import { Icons } from '../components/index.js';
import { AppRouter } from '../router/app-router.js';

export const renderEventListeners = (route) => {
    if (!route) return;

    switch (route) {
        case AppRoutes.welcome:
            welcomeEvents();
            break;
        case AppRoutes.login:
            loginEvents();
            break;
        case AppRoutes.signup:
            signupEvents();
            break;
        case AppRoutes.myday:
            groupEvents();
            break;
        case AppRoutes.group:
            groupEvents();
            break;
        case AppRoutes.settings:
            settingsEvents();
            break;
        case AppRoutes.profile:
            profileEvents();
            break;
        case AppRoutes.mygroups:
            myGroupsEvents();
            break;
        case AppRoutes.forget:
            ForgetEvents();
            break;
        default:
            break;
    }
}

const welcomeEvents = () => {
    try {
        const loginBtn = document.querySelector('.login__button');
        const signupBtn = document.querySelector('.signup__button');

        loginBtn.onclick = () => {
            location.hash = AppRoutes.login;
        }

        signupBtn.onclick = () => {
            location.hash = AppRoutes.signup;
        }
    } catch (error) {
        console.error('Error with welcome events...', error);
    }
}

const loginEvents = () => {
    try {
        const nameInput = document.querySelector('#name');
        const passwordInput = document.querySelector('#password');
        const nameError = nameInput.nextElementSibling;
        const passwordError = passwordInput.nextElementSibling;

        const backBtn = document.querySelector('.layout__header--button');
        const forgetBtn = document.querySelector('.login__forget');
        const accessBtn = document.querySelector('.layout__footer--button');

        // Inputs Event Listeners

        nameInput.addEventListener('input', (e) => {
            const nameValue = e.target.value;
            if (!nameValue) {
                nameError.innerHTML = 'Campo requerido';
            } else {
                nameError.innerHTML = '';
            }
        });

        passwordInput.addEventListener('input', (e) => {
            const passwordValue = e.target.value;
            if (!passwordValue) {
                passwordError.innerHTML = 'Campo requerido';
            } else {
                passwordError.innerHTML = '';
            }
        });

        // Buttons Event Listeners

        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            location.hash = AppRoutes.welcome;
        });

        forgetBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if(!nameInput.value) {
                nameError.textContent = 'Debe ingresar el nombre de usuario';
                return;
            }
            const isUser = await Storage.getUserByName(nameInput.value);
            if(isUser.id) {
                location.hash = AppRoutes.forget;
                Storage.setToStorage('userId', isUser.id)
            } else {
                nameError.textContent = 'Usuario no encontrado';
                console.error('User not found');
            }
        });

        accessBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!nameInput.value) {
                nameError.innerHTML = 'Campo requerido';
                return;
            } else {
                nameError.innerHTML = '';
            }

            if (!passwordInput.value) {
                passwordError.innerHTML = 'Campo requerido';
                return;
            } else {
                passwordError.innerHTML = '';
            }

            const user = {
                name: nameInput.value,
                password: passwordInput.value
            }

            const userCreated = Storage.login(user);

            userCreated.then((data) => {
                if (data.id) {
                    location.hash = AppRoutes.myday;
                    Storage.setToStorage('token', data.id);
                } else {
                    nameError.innerHTML = 'Usuario o contraseña incorrectos';
                    passwordError.innerHTML = 'Usuario o contraseña incorrectos';
                    console.error('Error logging in');
                }
            }).catch((error) => {
                console.error('Error logging in', error);
            });
        });
    } catch (error) {
        console.error('Error with login events...', error);
    }
}

const signupEvents = () => {
    try {

        const answersList = [];

        // Inputs Variables

        const emailInput = document.querySelector('#email');
        const usernameInput = document.querySelector('#name');
        const passwordInput = document.querySelector('#password');
        const passwordConfirmInput = document.querySelector('#passwordConfirm');
        const questionsSelect = document.querySelector('#questions');
        const anwerInput = document.querySelector('#answer');

        const emailError = emailInput.nextElementSibling;
        const usernameError = usernameInput.nextElementSibling;
        const passwordError = passwordInput.nextElementSibling;
        const passwordConfirmError = passwordConfirmInput.nextElementSibling;
        const questionsSelectError = questionsSelect.nextElementSibling;
        const answerInputError = document.querySelector('.answer__container').nextElementSibling;

        // Buttons Variables

        const backBtn = document.querySelector('.layout__header--button');
        const avatarBtn = document.querySelector('.avatar');
        const closeAvatarBtn = document.querySelector('.avatar__dialog--close');
        const signupBtn = document.querySelector('.layout__footer--button');
        const avatarsImg = document.querySelectorAll('.avatar__dialog--img');
        const nextQuestionBtn = document.querySelector('.next__question--btn');


        // Inputs Event Listeners
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        emailInput.addEventListener('input', (e) => {
            const emailValue = e.target.value;
            if (!emailPattern.test(emailValue)) {
                emailError.innerHTML = 'Debe ser un correo válido';
            } else {
                emailError.innerHTML = '';
            }
        });

        usernameInput.addEventListener('input', (e) => {
            const usernameValue = e.target.value;
            if (usernameValue.length < 4) {
                usernameError.innerHTML = 'Debe tener al menos 4 caracteres';
            } else {
                usernameError.innerHTML = '';
            }
        });

        passwordInput.addEventListener('input', (e) => {
            const passwordValue = e.target.value;
            if (passwordValue.length < 8) {
                passwordError.innerHTML = 'Debe tener al menos 8 caracteres';
            } else {
                passwordError.innerHTML = '';
            }
        });

        passwordConfirmInput.addEventListener('input', (e) => {
            const passwordConfirmValue = e.target.value;
            const passwordValue = password.value;
            if (passwordConfirmValue !== passwordValue) {
                passwordConfirmError.innerHTML = 'Las contraseñas no coinciden';
            } else {
                passwordConfirmError.innerHTML = '';
            }
        });

        anwerInput.addEventListener('input', () => {
            answerInputError.innerHTML = '';
        });

        questionsSelect.addEventListener('change', () => {
            questionsSelectError.innerHTML = '';
        })


        // Buttons Event Listeners

        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            location.hash = AppRoutes.welcome;
        });

        avatarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const avatarDialog = document.querySelector('.avatar__dialog');
            avatarDialog.showModal();
        });

        closeAvatarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const avatarDialog = document.querySelector('.avatar__dialog');
            avatarDialog.close();
        });

        avatarsImg.forEach(avatar => {
            avatar.addEventListener('click', (e) => {
                e.preventDefault();
                const avatarBtn = document.querySelector('.avatar');
                avatarBtn.setAttribute('selected', 'true');
                const avatarImg = avatar.src;
                const avatarError = avatarBtn.nextElementSibling.nextElementSibling;
                avatarError.innerHTML = '';
                avatarBtn.innerHTML = `<img id="avatarSelected" src="${avatarImg}" alt="Avatar">`;
                const avatarDialog = document.querySelector('.avatar__dialog');

                avatarDialog.close();
            });
        })

        nextQuestionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (answersList.length === 3) {
                questionsSelectError.innerHTML = 'Ya están registradas todas las preguntas';
                return;
            };
            const currentQuestion = questionsSelect.selectedIndex !== 0 ? questionsSelect.options[questionsSelect.selectedIndex].text : false;
            const currentAnswer = anwerInput.value;
            if (currentQuestion && currentAnswer) {
                if (answersList.find(answer => answer.question === currentQuestion)) {
                    questionsSelectError.innerHTML = 'Ya seleccionaste esa pregunta';
                    return;
                }
                if (answersList.length === 2) {
                    nextQuestionBtn.setAttribute('disabled', 'true');
                }
                answersList.push(
                    {
                        question: currentQuestion,
                        answer: currentAnswer.toLowerCase()
                    }
                )
                questionsSelect.value = 0;
                anwerInput.value = '';
            } else if (currentQuestion && !currentAnswer) {
                answerInputError.innerHTML = 'Debe responder la pregunta';
            } else if (!currentQuestion && currentAnswer) {
                questionsSelectError.innerHTML = 'Debe seleccionar una pregunta';
            } else {
                questionsSelectError.innerHTML = 'Debe seleccionar y responder 3 preguntas de seguridad';
            }
        });

        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const avatarContainer = document.querySelector('.signup__form--avatar');
            const avatarSelected = avatarContainer.querySelector('#avatarSelected');
            const avatarError = avatarContainer.querySelector('.error__form--message');

            if (!avatarSelected) {
                window.scrollTo(0, 0);
                avatarError.innerHTML = 'Debe seleccionar un avatar';
                return;
            }

            if (!emailPattern.test(emailInput.value)) {
                emailError.innerHTML = 'Debe ser un correo válido';
                return;
            } else {
                emailError.innerHTML = '';
            }

            if (usernameInput.value.length < 4) {
                usernameError.innerHTML = 'Debe tener al menos 4 caracteres';
                return;
            } else {
                usernameError.innerHTML = '';
            }


            if (passwordInput.value.length < 8) {
                passwordError.innerHTML = 'Debe tener al menos 8 caracteres';
                return;
            } else {
                passwordError.innerHTML = '';
            }


            if (passwordConfirmInput.value !== passwordInput.value) {
                passwordConfirmError.innerHTML = 'Las contraseñas no coinciden';
                return;
            } else {
                passwordConfirmError.innerHTML = '';
            }

            if (answersList.length < 3) {
                questionsSelectError.innerHTML = 'Debe seleccionar y responder 3 preguntas de seguridad';
                return;
            } else {
                questionsSelectError.innerHTML = '';
            }

            const newUser = {
                avatar: avatarSelected.src,
                email: emailInput.value,
                name: usernameInput.value,
                password: passwordInput.value,
                firstQuestion: answersList[0].question,
                firstAnswer: answersList[0].answer,
                secondQuestion: answersList[1].question,
                secondAnswer: answersList[1].answer,
                thirdQuestion: answersList[2].question,
                thirdAnswer: answersList[2].answer,
            }

            const user = Storage.saveUser(newUser);

            user.then((data) => {
                if (data) {
                    location.hash = AppRoutes.login;
                } else {
                    console.error('Error saving user');
                }
            }).catch((error) => {
                console.error('Error saving user', error);
            });

        });

    } catch (error) {
        console.error('Error with signup events...', error);
    }
}

const navbarEvents = () => {
    const NavBarBtn = document.querySelector('.layout__header--button');

    NavBarBtn.addEventListener('click', () => {
        const navbar = document.querySelector('#navbar');
        const overlay = document.querySelector('#overlay');
        const addGroup = document.querySelector('.navbar__footer--add__group--btn');
        const signout = document.querySelector('.navbar__footer--signout--btn');
        const navbarGroups = document.querySelectorAll('.navbar__group');
        const settingsBtn = document.querySelector('.settings--btn');

        navbar.classList.add('show');
        overlay.classList.add('show');

        navbarGroups.forEach(group => {
            group.onclick = () => {
                navbar.classList.remove('show');
                overlay.classList.remove('show');
                if (group.id === '0') {
                    Storage.setToStorage('currentGroup', 0);
                    location.hash = AppRoutes.myday;
                } else {
                    Storage.setToStorage('currentGroup', group.id);
                    location.hash = AppRoutes.group;
                    AppRouter();
                }
            };
        });

        overlay.addEventListener('click', () => {
            navbar.classList.remove('show');
            overlay.classList.remove('show');
        });

        addGroup.onclick = () => {
            navbar.classList.remove('show');
            overlay.classList.remove('show');
            let addGroupDialog = document.querySelector('.add__group--dialog');
            if (!addGroupDialog) {
                addGroupDialog = document.createElement('dialog');
                addGroupDialog.classList.add('add__group--dialog');
                addGroupDialog.innerHTML =
                    `
                <form class="add__group">
                    <div class="add__group--container">
                        <label for="group__name">Nombre del grupo</label>
                        <input type="text" id="group__name" class="group__name">
                        <span class="error__form--message"></span>
                    </div>
                    <div class="add__group--container">
                        <label for="group__color">Color del grupo</label>
                        <input  type="color" id="group__color" class="group__color">
                    </div>
                    <div class="add__group--ctas">
                        <button class="save__group--btn">Guardar</button>
                        <button class="cancel__group--btn">Cancelar</button>
                    </div>
                </form>
            `;
                document.body.appendChild(addGroupDialog);
            } else {
                const groupName = addGroupDialog.querySelector('.group__name');
                const groupColor = addGroupDialog.querySelector('.group__color');
                groupName.value = '';
                groupColor.value = '#000000';
            }

            addGroupDialog.showModal();

            const saveGroupBtn = addGroupDialog.querySelector('.save__group--btn');
            const cancelGroupBtn = addGroupDialog.querySelector('.cancel__group--btn');

            saveGroupBtn.onclick = async (e) => {
                e.preventDefault();
                const groupName = addGroupDialog.querySelector('.group__name');
                const groupColor = addGroupDialog.querySelector('.group__color');
                if (!groupName.value) {
                    groupName.nextElementSibling.innerHTML = 'Campo requerido';
                    return;
                }
                const group = {
                    description: groupName.value,
                    color: groupColor.value,
                    userId: Storage.getFromStorage('token')
                }
                const newGroup = await Storage.saveGroup(group);
                if (newGroup.id) {
                    addGroupDialog.close();
                    Storage.setToStorage('currentGroup', newGroup.id);
                    location.hash = AppRoutes.group;
                    AppRouter();
                };
            };

            cancelGroupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addGroupDialog.close();
            });
        };

        signout.addEventListener('click', (e) => {
            e.preventDefault();
            Storage.clearStorage();
            navbar.classList.remove('show');
            overlay.classList.remove('show');
            location.hash = AppRoutes.login;
        });

        settingsBtn.addEventListener('click', () => {
            navbar.classList.remove('show');
            overlay.classList.remove('show');
            location.hash = AppRoutes.settings;
        });
    })
}

const taskFrameEvents = () => {
    const taskDialog = document.querySelector('#taskDialog');

    const closeFrame = taskDialog.querySelector('.close__frame--btn');

    const taskDoneBtn = taskDialog.querySelector('.task--frame__completed--btn');

    const subTaskNewBtn = taskDialog.querySelector('#subtask__new--btn');

    closeFrame.addEventListener('click', (e) => {
        e.preventDefault();
        taskDialog.close();
        taskDialog.remove();
        Storage.setToStorage('taskId', '');
    });

    taskDoneBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const task = taskDialog.querySelector('.frame__task');
        task.classList.toggle('completed');
    });

    subTaskNewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const subTasksList = taskDialog.querySelector('.subtasks__list');
        const subTask = document.createElement('li');
        subTask.classList.add('subtask');
        subTask.innerHTML = `
                <button class="subtask__completed--btn">
                    <img src="${Icons.check}" alt="Subtarea completada">
                </button>
                <input type="text" class="subtask__info">
            `;
        subTasksList.appendChild(subTask);

        const subTasksBtn = subTasksList.querySelectorAll('.subtask__completed--btn');

        subTasksBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const subTask = btn.closest('.subtask');
                subTask.classList.toggle('completed');
            });
        });
    });

    // Inputs Event Listeners

    const titleInput = taskDialog.querySelector('#task__title');
    const titleInputError = document.querySelector('.frame__task .task__error')
    const taskGroupInput = taskDialog.querySelector('#task__group');
    const taskMyDayInput = taskDialog.querySelector('#task__myday');
    const dueDateInput = taskDialog.querySelector('#task__due');
    const dueTimeInput = taskDialog.querySelector('#task__time');
    const descriptionInput = taskDialog.querySelector('#task__description');

    titleInput.addEventListener('input', (e) => {
        const titleValue = e.target.value;
        if (!titleValue) {
            titleInputError.innerHTML = 'Campo requerido';
        } else {
            titleInputError.innerHTML = '';
        }
    });

    // Buttons Event Listeners

    const taskId = Storage.getFromStorage('taskId');
    const saveTaskBtn = taskDialog.querySelector('.save__task--btn');
    const deleteTaskBtn = taskDialog.querySelector('.delete__task--btn');

    if (taskId.length === 0) {
        deleteTaskBtn.textContent = 'Cancelar';
    }

    saveTaskBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const titleValue = titleInput.value;
        if (!titleValue) {
            titleInputError.innerHTML = 'Campo requerido';
            return;
        } else {
            titleInputError.innerHTML = '';
        }

        let currentGroup = Storage.getFromStorage('currentGroup');
        currentGroup *= 1;

        let isMyDay = 0;

        let taskId = Storage.getFromStorage('taskId');

        if (taskId.length > 0) {
            if (taskMyDayInput.checked) isMyDay = 1;
            else isMyDay = 0;
        } else {
            if (currentGroup === 0) isMyDay = 1;
            else isMyDay = 0;
        }

        const statusId = taskDialog.querySelector('.frame__task').classList.contains('completed') ? 2 : 1;

        const task = {
            id: taskId.length > 0 ? taskId : null,
            title: titleValue,
            dueDate: `${dueDateInput.value} ${dueTimeInput.value}`.length > 1 ? `${dueDateInput.value} ${dueTimeInput.value}` : null,
            description: descriptionInput.value || null,
            myday: isMyDay,
            statusId: statusId,
            groupId: taskGroupInput.value ? taskGroupInput.value * 1 : null,
            userId: Storage.getFromStorage('token')
        }

        Object.keys(task).forEach(key => {
            if (task[key] === null || task[key] === '' || task[key] === undefined) {
                delete task[key];
            }
        })

        const subTasks = [];
        const subTasksElements = taskDialog.querySelectorAll('.subtask');
        if (subTasksElements.length > 0) {
            subTasksElements.forEach(subtask => {
                if (subtask.querySelector('.subtask__info').value) {
                    subTasks.push(
                        {
                            id: subtask.id || null,
                            title: subtask.querySelector('.subtask__info').value
                        }
                    )
                }
            })
        }

        Object.keys(subTasks).forEach(key => {
            if (!subTasks[key]) {
                delete subTasks[key];
            }
        })

        if (!task.id) {
            const taskCreated = await Storage.saveTask(task);
            if (taskCreated.id) {
                if (subTasks.length > 0) {
                    Storage.saveSubTasks(subTasks, taskCreated.id);
                }
                taskDialog.close();
                AppRouter();
            } else {
                console.error('Error saving task');
            }
        } else if (task.id) {
            const taskUpdated = await Storage.updateTask(task);
            if (taskUpdated.id) {
                if (subTasks.length > 0 && subTasks[0].id) {
                    Storage.updateSubTasks(subTasks);
                } else if (subTasks.length > 0 && !subTasks[0].id) {
                    Storage.saveSubTasks(subTasks, task.id);
                }
                taskDialog.close();
                AppRouter();
            } else {
                console.error('Error updating task');
            }
        }
    });

    deleteTaskBtn.onclick = async (e) => {
        e.preventDefault();
        if (taskId) {
            const deletedTask = await Storage.deleteTask(taskId);
            try {
                const subTasks = await Storage.getSubTasks(taskId);
                if (subTasks.length > 0) {
                    const deletedSubTasks = [];
                    subTasks.forEach(async subtask => {
                        if (subtask.id) {
                            deletedSubTasks.push(await Storage.deleteSubTask(subtask.id));
                        }
                    })
                    if (deletedSubTasks.length > 0) {
                        taskDialog.close();
                        AppRouter();
                    }
                } else {
                    taskDialog.close();
                    AppRouter();
                }
            } catch {
                taskDialog.close();
                AppRouter();
            }
        }
        taskDialog.close();
        AppRouter();
    }
}

const groupEvents = async () => {

    const completedTasksContainer = document.querySelector('#completed__tasks');

    const checkBtns = document.querySelectorAll('.task__completed--btn');

    const tasksList = document.querySelectorAll('.task');

    const dropdownBtn = document.querySelector('.dropdown__btn');
    const newTaskBtn = document.querySelector('.layout__footer--button');

    try {
        dropdownBtn.onclick = () => {
            dropdownBtn.classList.toggle('show');
            if (completedTasksContainer.classList.contains('hidden')) {
                completedTasksContainer.classList.remove('hidden');
                setTimeout(() => {
                    completedTasksContainer.classList.toggle('show');
                }, 100);
            } else {
                completedTasksContainer.classList.toggle('show');
                setTimeout(() => {
                    completedTasksContainer.classList.add('hidden');
                }, 100);
            }
        };
    } catch { }

    navbarEvents();

    checkBtns.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const taskElement = btn.closest('.task');
            taskElement.classList.toggle('completed');
            const task = {
                id: taskElement.id,
                statusId: taskElement.classList.contains('completed') ? 2 : 1
            }
            Storage.updateTask(task);
            setTimeout(() => {
                AppRouter();
            }, 500);
        };
    });

    if (tasksList.length !== 0) {
        tasksList.forEach(task => {
            task.onclick = async (e) => {
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG') return;
                const taskId = task.id;
                const taskObject = Storage.getTasksById(taskId);
                const taskData = await taskObject;
                taskData.subtasks = [];
                try {
                    const subTasks = await Storage.getSubTasks(taskId)
                    taskData.subtasks = [...subTasks];
                } catch { }
                const dialog = await taskFrameView(taskData);
                document.body.appendChild(dialog);
                dialog.showModal();
                Storage.setToStorage('taskId', taskId);
                taskFrameEvents();
            }
        })
    }

    newTaskBtn.onclick = async (e) => {
        e.preventDefault();
        const taskDialog = await taskFrameView();
        document.body.appendChild(taskDialog);
        taskDialog.showModal();
        taskFrameEvents();
    };
}

const settingsEvents = () => {
    const backBtn = document.querySelector('.layout__header--button');
    const signoutBtn = document.querySelector('.layout__footer--button');

    backBtn.onclick = (e) => {
        e.preventDefault();
        location.hash = AppRoutes.myday;
    }

    signoutBtn.onclick = (e) => {
        e.preventDefault();
        Storage.clearStorage();
        location.hash = AppRoutes.login;
    }

    const profileBtn = document.querySelector('.profile__btn');
    const myGroupsBtn = document.querySelector('.mygroups__btn');

    profileBtn.onclick = () => {
        location.hash = AppRoutes.profile;
    }

    myGroupsBtn.onclick = () => {
        location.hash = AppRoutes.mygroups;
    }
}

const profileEvents = async () => {
    try {


        // Inputs Variables

        const emailInput = document.querySelector('#email');
        const usernameInput = document.querySelector('#name');
        const passwordInput = document.querySelector('#password');
        const passwordConfirmInput = document.querySelector('#passwordConfirm');

        const emailError = emailInput.nextElementSibling;
        const usernameError = usernameInput.nextElementSibling;
        const passwordError = passwordInput.nextElementSibling;
        const passwordConfirmError = passwordConfirmInput.nextElementSibling;

        // Fill Profile Data

        const user = await Storage.getUserById(Storage.getFromStorage('token'));
        const avatarContainer = document.querySelector('.profile__form--avatar');
        const avatarImg = avatarContainer.querySelector('.avatar img');
        avatarImg.id = 'avatarSelected';
        avatarImg.src = user.avatar;
        emailInput.value = user.email;
        emailInput.disabled = true;
        usernameInput.value = user.name;
        usernameInput.disabled = true;

        // Buttons Variables

        const backBtn = document.querySelector('.layout__header--button');
        const avatarBtn = document.querySelector('.avatar');
        const closeAvatarBtn = document.querySelector('.avatar__dialog--close');
        const updateBtn = document.querySelector('.layout__footer--button');
        const avatarsImg = document.querySelectorAll('.avatar__dialog--img');


        // Inputs Event Listeners

        passwordInput.addEventListener('input', (e) => {
            const passwordValue = e.target.value;
            if (passwordValue.length < 8) {
                passwordError.innerHTML = 'Debe tener al menos 8 caracteres';
            } else {
                passwordError.innerHTML = '';
            }
        });

        passwordConfirmInput.addEventListener('input', (e) => {
            const passwordConfirmValue = e.target.value;
            const passwordValue = password.value;
            if (passwordConfirmValue !== passwordValue) {
                passwordConfirmError.innerHTML = 'Las contraseñas no coinciden';
            } else {
                passwordConfirmError.innerHTML = '';
            }
        });


        // Buttons Event Listeners

        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            location.hash = AppRoutes.settings;
        });

        avatarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const avatarDialog = document.querySelector('.avatar__dialog');
            avatarDialog.showModal();
        });

        closeAvatarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const avatarDialog = document.querySelector('.avatar__dialog');
            avatarDialog.close();
        });

        avatarsImg.forEach(avatar => {
            avatar.addEventListener('click', (e) => {
                e.preventDefault();
                const avatarBtn = document.querySelector('.avatar');
                avatarBtn.setAttribute('selected', 'true');
                const avatarImg = avatar.src;
                const avatarError = avatarBtn.nextElementSibling.nextElementSibling;
                avatarError.innerHTML = '';
                avatarBtn.innerHTML = `<img id="avatarSelected" src="${avatarImg}" alt="Avatar">`;
                const avatarDialog = document.querySelector('.avatar__dialog');

                avatarDialog.close();
            });
        })

        updateBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const avatarContainer = document.querySelector('.profile__form--avatar');
            const avatarSelected = avatarContainer.querySelector('#avatarSelected');
            const avatarError = avatarContainer.querySelector('.error__form--message');

            if (!avatarSelected) {
                window.scrollTo(0, 0);
                avatarError.innerHTML = 'Debe seleccionar un avatar';
                return;
            }


            if (passwordInput.value) {
                if (passwordInput.value.length < 8) {
                    passwordError.innerHTML = 'Debe tener al menos 8 caracteres';
                    return;
                } else {
                    passwordError.innerHTML = '';
                }


                if (passwordConfirmInput.value !== passwordInput.value) {
                    passwordConfirmError.innerHTML = 'Las contraseñas no coinciden';
                    return;
                } else {
                    passwordConfirmError.innerHTML = '';
                }
            }

            const updatedUser = {
                id: Storage.getFromStorage('token'),
                avatar: avatarSelected.src,
                password: passwordInput.value,
            }

            Object.keys(updatedUser).forEach(key => {
                if (updatedUser[key] === null || updatedUser[key] === '' || updatedUser[key] === undefined) {
                    delete updatedUser[key];
                }
            })

            const user = Storage.updateUser(updatedUser);

            user.then((data) => {
                if (data) {
                    location.hash = AppRoutes.myday;
                    const navbarAvatar = document.querySelector('.navbar__header--userinfo img');
                    navbarAvatar.src = updatedUser.avatar;
                } else {
                    console.error('Error saving user');
                }
            }).catch((error) => {
                console.error('Error saving user', error);
            });

        });

    } catch (error) {
        console.error('Error with profile events...', error);
    }
}

const myGroupsEvents = async () => {
    try {

        // Buttons Variables

        const backBtn = document.querySelector('.layout__header--button');
        const addGroup = document.querySelector('.new__group');
        const deleteGroup = document.querySelectorAll('.delete__group--btn');
        const updateBtn = document.querySelector('.layout__footer--button');

        // Buttons Event Listeners

        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            location.hash = AppRoutes.settings;
        });

        addGroup.onclick = () => {
            let addGroupDialog = document.querySelector('.add__group--dialog');
            if (!addGroupDialog) {
                addGroupDialog = document.createElement('dialog');
                addGroupDialog.classList.add('add__group--dialog');
                addGroupDialog.innerHTML =
                    `
                <form class="add__group">
                    <div class="add__group--container">
                        <label for="group__name">Nombre del grupo</label>
                        <input type="text" id="group__name" class="group__name">
                        <span class="error__form--message"></span>
                    </div>
                    <div class="add__group--container">
                        <label for="group__color">Color del grupo</label>
                        <input  type="color" id="group__color" class="group__color">
                    </div>
                    <div class="add__group--ctas">
                        <button class="save__group--btn">Guardar</button>
                        <button class="cancel__group--btn">Cancelar</button>
                    </div>
                </form>
            `;
                document.body.appendChild(addGroupDialog);
            } else {
                const groupName = addGroupDialog.querySelector('.group__name');
                const groupColor = addGroupDialog.querySelector('.group__color');
                groupName.value = '';
                groupColor.value = '#000000';
            }

            addGroupDialog.showModal();

            const saveGroupBtn = addGroupDialog.querySelector('.save__group--btn');
            const cancelGroupBtn = addGroupDialog.querySelector('.cancel__group--btn');

            saveGroupBtn.onclick = async (e) => {
                e.preventDefault();
                const groupName = addGroupDialog.querySelector('.group__name');
                const groupColor = addGroupDialog.querySelector('.group__color');
                if (!groupName.value) {
                    groupName.nextElementSibling.innerHTML = 'Campo requerido';
                    return;
                }
                const group = {
                    description: groupName.value,
                    color: groupColor.value,
                    userId: Storage.getFromStorage('token')
                }
                const newGroup = await Storage.saveGroup(group);
                if (newGroup.id) {
                    addGroupDialog.close();
                    location.hash = AppRoutes.mygroups;
                    AppRouter();
                };
            };

            cancelGroupBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addGroupDialog.close();
            });
        };

        deleteGroup.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const groupId = e.target.closest('.mygroups__group').id;
                const deletedGroup = await Storage.deleteGroup(groupId);
                if (deletedGroup) {
                    const deletedTasks = await Storage.deleteTasksByGroup(groupId);
                    location.hash = AppRoutes.mygroups;
                    AppRouter();
                } else {
                    console.error('Error deleting group');
                }
            })
        })

        updateBtn.onclick = (e) => {
            e.preventDefault();
            const groups = document.querySelectorAll('.mygroups__group');
            const updatedGroups = [];
            groups.forEach(group => {
                const groupElement = {
                    id: group.id,
                    description: group.querySelector('.group__description').textContent,
                    color: group.querySelector('.group__color').style.backgroundColor
                }
                updatedGroups.push(groupElement);
            })
            updatedGroups.forEach(async group => {
                const updatedGroup = await Storage.updateGroup(group);
                if (updatedGroup) {
                    location.hash = AppRoutes.mygroups;
                    AppRouter();
                } else {
                    console.error('Error updating group');
                }
            })
        }

    } catch (error) {
        console.error('Error with groups events...', error);
    }
}

const ForgetEvents = () => {
    const emailInput = document.querySelector('#email');
    const emailError = emailInput.nextElementSibling;
    const firstAnswer = document.querySelector('#firstQuestion');
    const firstAnswerError = firstAnswer.nextElementSibling;
    const secondAnswer = document.querySelector('#secondQuestion');
    const secondAnswerError = secondAnswer.nextElementSibling;
    const thirdAnswer = document.querySelector('#thirdQuestion');
    const thirdAnswerError = thirdAnswer.nextElementSibling;
    const passwordInput = document.querySelector('#password');
    const passwordError = passwordInput.nextElementSibling;
    const passwordConfirmInput = document.querySelector('#confirmPassword');
    const passwordConfirmError = passwordConfirmInput.nextElementSibling;

    passwordConfirmInput.addEventListener('input', (e) => {
        const passwordConfirmValue = e.target.value;
        const passwordValue = passwordInput.value;
        if (passwordConfirmValue !== passwordValue) {
            passwordConfirmError.innerHTML = 'Las claves no coinciden';
        } else {
            passwordConfirmError.innerHTML = '';
        }
    });

    const backBtn = document.querySelector('.layout__header--button');
    const sendBtn = document.querySelector('.layout__footer--button');

    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Storage.setToStorage('userId', '')
        location.hash = AppRoutes.login;
    });

    sendBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const emailValue = emailInput.value;
        const firstAnswerValue = firstAnswer.value;
        const secondAnswerValue = secondAnswer.value;
        const thirdAnswerValue = thirdAnswer.value;

        if (!emailValue) {
            emailError.innerHTML = 'Campo requerido';
            return;
        } else {
            emailError.innerHTML = '';
        }

        if (!firstAnswerValue) {
            firstAnswerError.innerHTML = 'Campo requerido';
            return;
        } else {
            firstAnswerError.innerHTML = '';
        }

        if (!secondAnswerValue) {
            secondAnswerError.innerHTML = 'Campo requerido';
            return;
        } else {
            secondAnswerError.innerHTML = '';
        }

        if (!thirdAnswerValue) {
            thirdAnswerError.innerHTML = 'Campo requerido';
            return;
        } else {
            thirdAnswerError.innerHTML = '';
        }

        if (!passwordInput.value) {
            passwordError.innerHTML = 'Campo requerido';
            return;
        } else {
            passwordError.innerHTML = '';
        }

        if (!passwordConfirmInput.value) {
            passwordConfirmError.innerHTML = 'Campo requerido';
            return;
        } else {
            passwordConfirmError.innerHTML = '';
            if (passwordConfirmInput.value !== passwordInput.value) {
                passwordConfirmError.innerHTML = 'Las claves no coinciden';
                return;
            } else {
                passwordConfirmError.innerHTML = '';
            }
        }

        const user = {
            id: Storage.getFromStorage('userId'),
            firstAnswer: firstAnswerValue.toLowerCase(),
            secondAnswer: secondAnswerValue.toLowerCase(),
            thirdAnswer: thirdAnswerValue.toLowerCase(),
            password: passwordInput.value
        }

        const updatedUser = await Storage.updateForgotPassword(user);

        if(updatedUser.id) {
            Storage.setToStorage('userId', '');
            location.hash = AppRoutes.login;
        }
    });
}