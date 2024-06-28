import { AppRoutes } from '../router/routes.js';
import Storage from '../storage/app-storage.js';
import { taskFrameView } from './new-task-frame.js';
import { Icons } from '../components/index.js';

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
            mydayEvents();
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

        forgetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            location.hash = AppRoutes.forget;
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
                        answer: currentAnswer
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

const mydayEvents = async () => {

    // const taskFrame = await taskFrameView();
    // document.body.appendChild(taskFrame);

    const completedTasksContainer = document.querySelector('#completed__tasks');

    const checkBtns = document.querySelectorAll('.task__completed--btn');

    const tasksList = document.querySelectorAll('.task');
    
    const dropdownBtn = document.querySelector('.dropdown__btn');
    const newTaskBtn = document.querySelector('.layout__footer--button');

    try {
        dropdownBtn.addEventListener('click', () => {
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
        });
    } catch {
        console.error('Not completed tasks');
    }

    checkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const task = btn.closest('.task');
            task.classList.toggle('completed');
        });
    });

    if(tasksList.length !== 0) {
        tasksList.forEach(task => {
            task.onclick = async (e) => {
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG') return;
                const taskId = task.id;
                const taskTitle = task.querySelector('.task__title').innerHTML;
                const subTasks = task.querySelectorAll('.subtask') || [];
                const taskObject = {
                    id: taskId,
                    title: taskTitle,
                    subtasks: [...subTasks].map(subtask => ({ title: subtask.innerHTML }))
                }
                const dialog = await newTaskDialog(taskObject);
                document.body.appendChild(dialog);
                dialog.showModal();
            }
        })
    }

    newTaskBtn.addEventListener('click', async () => {
        const taskDialog = await taskFrameView();
        document.body.appendChild(taskDialog);
        taskDialog.showModal();

        const closeFrame = taskDialog.querySelector('.close__frame--btn');

        const taskDoneBtn = taskDialog.querySelector('.task--frame__completed--btn');

        const subTaskNewBtn = taskDialog.querySelector('#subtask__new--btn');

        closeFrame.addEventListener('click', (e) => {
            e.preventDefault();
            taskDialog.close();
        });

        taskDoneBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const task = taskDoneBtn.closest('.frame__task');
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
    });
}