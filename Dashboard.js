import { getCryptocurrencies } from '../services/api.js';

async function Dashboard() {
    const dashboardDiv = document.createElement('div');
    dashboardDiv.className = 'container mt-5';

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        dashboardDiv.innerHTML = '<h2>Bitte loggen Sie sich ein, um das Dashboard zu sehen.</h2>';
        return dashboardDiv;
    }

    try {
        dashboardDiv.innerHTML = `
            <h2 class="text-center">Aktuelle Kryptowährungen</h2>
            <div class="mb-3">
                <input type="text" id="cryptoSearch" class="form-control" placeholder="Kryptowährung suchen...">
            </div>
            <div id="cryptoList" class="row mt-4"></div>
        `;

        const cryptoList = dashboardDiv.querySelector('#cryptoList');
        const searchInput = dashboardDiv.querySelector('#cryptoSearch');
        const data = await getCryptocurrencies();

        const displayCryptos = (cryptos) => {
            cryptoList.innerHTML = '';
            cryptos.forEach((crypto) => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <div class="card">
                        <div class="card-body text-center">
                            <img src="${crypto.image}" alt="${crypto.name}" class="img-fluid mb-2" style="max-height: 50px;">
                            <h5 class="card-title">${crypto.name} (${crypto.symbol.toUpperCase()})</h5>
                            <p class="card-text">Preis: $${crypto.current_price.toLocaleString()}</p>
                            <button class="btn btn-primary btn-sm">Zur Watchlist hinzufügen</button>
                        </div>
                    </div>
                `;
                cryptoList.appendChild(col);

                col.querySelector('.btn-primary').addEventListener('click', async () => {
                    const response = await fetch(`http://localhost:3000/users/${user.id}`);
                    const userData = await response.json();

                    const watchlist = userData.watchlist || [];

                    if (watchlist.find((item) => item.symbol === crypto.symbol)) {
                        alert('Diese Kryptowährung ist bereits in der Watchlist.');
                        return;
                    }

                    watchlist.push({
                        name: crypto.name,
                        symbol: crypto.symbol,
                        price: crypto.current_price,
                    });

                    await fetch(`http://localhost:3000/users/${user.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ watchlist }),
                    });

                    alert('Kryptowährung zur Watchlist hinzugefügt!');
                });
            });
        };

       
        displayCryptos(data);

        //Suchfunktion
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCryptos = data.filter((crypto) =>
                crypto.name.toLowerCase().includes(searchTerm) || crypto.symbol.toLowerCase().includes(searchTerm)
            );
            displayCryptos(filteredCryptos);
        });
    } catch (error) {
        console.error('Fehler beim Laden der Kryptowährungen:', error);
        dashboardDiv.innerHTML = '<h2>Fehler beim Laden der Kryptowährungen.</h2>';
    }

    return dashboardDiv;
}

export default Dashboard;
