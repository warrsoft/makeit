export const LoadingView = () => {
    const loading = document.createElement('div');
    loading.innerHTML = `
        <div id="loading">
            <div class="loading__icon">
                <div class="loading__icon--circle"></div>
                <div class="loading__icon--circle"></div>
                <div class="loading__icon--circle"></div>
            </div>
        </div>
    `;

    const isOnline = navigator.onLine;
    if(!isOnline) {
        loading.innerHTML = `
            <div id="loading">
                <div class="loading__icon">
                    <div class="loading__icon--circle"></div>
                    <div class="loading__icon--circle"></div>
                    <div class="loading__icon--circle"></div>
                </div>
                <p class="loading__text">No tienes conexión a internet</p>
            </div>
        `;
    }

    return loading;
}