import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import Watchlist from './components/Watchlist.js';
import Navigation from './components/Navigation.js';
import Footer from './components/Footer.js';

function router() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    // Navigation hinzufügen
    const navigation = Navigation();
    app.appendChild(navigation);

    const main = document.createElement('main');
    main.className = 'container';

    const user = JSON.parse(localStorage.getItem('user'));

    // Standard-Hash auf Dashboard 
    if (!location.hash) {
        location.hash = '#/dashboard';
    }

 


    if (!user && location.hash !== '#/login') {
        location.hash = '#/login'; // Umleitung zum Login, falls nicht eingeloggt
    }
  
    if (location.hash === '#/dashboard') {
        const dashboard = Dashboard();
        if (dashboard instanceof Promise) {
            dashboard.then((domNode) => main.appendChild(domNode));
        } else {
            main.appendChild(dashboard);
        }
    } else if (location.hash === '#/login') {
        const login = Login();
        main.appendChild(login);
    } else if (location.hash === '#/watchlist') {
        const watchlist = Watchlist();
        if (watchlist instanceof Promise) {
            watchlist.then((domNode) => main.appendChild(domNode));
        } else {
            main.appendChild(watchlist);
        }
    } else {
        main.innerHTML = '<h1>404 - Seite nicht gefunden</h1>';
    }
   

    app.appendChild(main);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);