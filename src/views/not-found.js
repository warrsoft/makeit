export const NotFoundView = (token) => {

    const navbar = document.querySelector('#navbar');
    if(!token && navbar) navbar.remove();

    const notFound = document.createElement('div');
    notFound.id = 'notfound__section';
    notFound.innerHTML = `
        <h1>404</h1>
        <h2>Page not found</h2>
    `;
    return [notFound];
}