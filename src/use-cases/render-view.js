export const renderView = async (layout, view, appContainer) => {
    if (!view || !appContainer) return;
    try {
        appContainer.innerHTML = '';
        if (!layout) {
            await appContainer.append(...view);
            return;
        }
        await appContainer.append(layout);
        const viewContainer = appContainer.querySelector('main');
        await viewContainer.append(...view);
    } catch (error) {
        console.log('Error rendering the view');
    }
}