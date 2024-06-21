const baseURL = 'https://makeit-server-production.up.railway.app/api'

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

const getGroups = async (token) => {
    try {
        const response = await fetch(`${baseURL}/tasks-group/${token}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching tasks', error);
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

const init = () => {
    getQuestions();
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
    login
}