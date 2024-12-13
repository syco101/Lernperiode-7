function Navigation() {
    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg navbar-dark bg-dark';

    const user = localStorage.getItem('user');

    nav.innerHTML = `
        <div class="container-fluid">
            <span class="navbar-brand">Krypto Tracker</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#/dashboard">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/watchlist">Watchlist</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/login">Login</a>
                    </li>
                </ul>
                ${user ? `<button id="logoutBtn" class="btn btn-danger ms-auto">Logout</button>` : ''}
            </div>
        </div>
    `;

    //  Logout
    if (user) {
        nav.querySelector('#logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('user');
            alert('Erfolgreich ausgeloggt!');
            location.hash = '#/login'; // Weiterleitung zur Login-Seite vom Logout Button
        });
    }

    return nav;
}

export default Navigation;
