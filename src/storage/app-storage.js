const baseURL = 'https://makeit-server.vercel.app/api'
const imagesURL = 'https://res.cloudinary.com/dzgraaqq2/image/upload/v1717354674/make-it'

const getQuestions = async () => {
    try {
        const response = await fetch(`${baseURL}/questions`);
        const data = await response.json();
        return await data;
    } catch (error) {
        console.error('Error fetching questions', error);
    }
}

const getUserById = async (userId) => {
    try {
        const response = await fetch(`${baseURL}/users/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user', error);
    }
}

const getTasks = async (token) => {
    try {
        const response = await fetch(`${baseURL}/tasks/${token}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tasks', error);
    }
}

const getTasksById = async (taskId) => {
    try {
        const response = await fetch(`${baseURL}/tasks?taskId=${taskId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching task', error);
    }
}

const saveTask = async (task) => {
    try {
        const response = await fetch(`${baseURL}/tasks`, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving task', error);
    }
}

const updateTask = async (task) => {
    try {
        const response = await fetch(`${baseURL}/tasks/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating task', error);
    }
}

const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`${baseURL}/tasks/${taskId}`, {
            method: 'DELETE',
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting task', error);
    }
}

const saveSubTasks = async (subtasks, taskId) => {
    if(subtasks.length === 0) return console.log('No subtasks to save');
    subtasks.forEach(async subtask => {
        try {
            const response = await fetch(`${baseURL}/sub-tasks/${taskId}`, {
                method: 'POST',
                body: JSON.stringify(subtask),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error saving subtask', error);
        }
    })
}

const updateSubTasks = async (subtasks) => {
    if (subtasks.length === 0) return console.log('No subtasks to update');
    subtasks.forEach(async subtask => {
        try {
            const response = await fetch(`${baseURL}/sub-tasks/${subtask.id}`, {
                method: 'PATCH',
                body: JSON.stringify(subtask),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating subtask', error);
        }
    })
}

const deleteSubTask = async (subtaskId) => {
    try {
        const response = await fetch(`${baseURL}/sub-tasks/${subtaskId}`, {
            method: 'DELETE',
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting subtask', error);
    }
}

const getSubTasks = async (taskId) => {
    try {
        const response = await fetch(`${baseURL}/sub-tasks/${taskId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching subtasks', error);
    }
}

const updateNavbarGroups = (groups) => {
    groups = groups.filter(group => group.id !== 1);
    const navbar = document.getElementById('navbar');
    const groupsElement = navbar.querySelector('.navbar__group--list.custome__groups');
    groupsElement.innerHTML = '';
    groups.forEach(group => {
        const groupElement = document.createElement('div');
        groupElement.classList.add('navbar__group');
        groupElement.id = group.id;
        groupElement.innerHTML = `
            <figure class="navbar__group--color" style="background-color: ${group.color}"></figure>
            <li class="navbar__group--text">${group.description}</li>
        `;
        groupsElement.appendChild(groupElement);
    });
}

const getGroups = async (token) => {
    try {
        const response = await fetch(`${baseURL}/tasks-group/${token}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tasks', error);
    }
}

const saveGroup = async (group) => {
    try {
        const response = await fetch(`${baseURL}/tasks-group`, {
            method: 'POST',
            body: JSON.stringify(group),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving group', error);
    }
}

const getGroupById = async (groupId) => {
    try {
        const response = await fetch(`${baseURL}/tasks-group/id/${groupId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching group', error);
    }
}

const saveUser = async (user) => {
    try {
        const response = await fetch(`${baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving user', error);
    }
}

const login = async (user) => {
    try {
        const response = await fetch(`${baseURL}/users/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch {
        console.error('Error logging in', error);
    }
}

const setToStorage = (key, value) => {
    sessionStorage.setItem(key, value);
}

const getFromStorage = (key) => {
    return sessionStorage.getItem(key);
}

const clearStorage = () => {
    sessionStorage.clear();
}

const init = () => {
    getQuestions();
    setToStorage('taskId', '');
}

export default {
    init,
    getQuestions,
    getFromStorage,
    getUserById,
    setToStorage,
    saveUser,
    getTasks,
    getGroups,
    imagesURL,
    login,
    saveTask,
    updateTask,
    saveSubTasks,
    clearStorage,
    getGroupById,
    getSubTasks,
    getTasksById,
    updateSubTasks,
    saveGroup,
    updateNavbarGroups,
    deleteTask,
    deleteSubTask
}