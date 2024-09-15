import Storage from '../storage/app-storage.js';

export const MyGroupsView = async (token) => {
    if (!token) {
        window.location.hash = AppRoutes.login;
        return;
    }

    document.title = 'Make It - Mis Grupos';

    const myGroupsView = document.createElement('div');
    myGroupsView.id = 'mygroups__section';

    const groups = await Storage.getGroupByUser(token);

    myGroupsView.innerHTML = `
            <div class="mygroups__header">
                <h1>Mis Grupos</h1>
                <button class="new__group">Nuevo Grupo</button>
            </div>
            <div class="mygroups__list">
            ${groups.length <= 1 ? 'No tienes grupos' : groups.filter(group => group.id != 1).map(group => `
                <div class="mygroups__group" id="${group.id}">
                    <input class="group__color" type="color" value="${group.color}">
                    <input class="group__description" type="text" value="${group.description}">
                    <button class="delete__group--btn"><img src="/icons/Close_LG.svg"/></button>
                </div>
            `).join('')}
            </div>
    `;
    return [myGroupsView];
}