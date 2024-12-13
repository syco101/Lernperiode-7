async function Watchlist() {
    const watchlistDiv = document.createElement('div');
    watchlistDiv.className = 'container mt-5';

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        watchlistDiv.innerHTML = '<h2>Bitte loggen Sie sich ein, um Ihre Watchlist zu sehen.</h2>';
        return watchlistDiv;
    }

    watchlistDiv.innerHTML = `
        <h2 class="text-center">Deine Watchlist</h2>
        <div id="watchlistItems" class="row mt-4"></div>
    `;

    const watchlistItems = watchlistDiv.querySelector('#watchlistItems');
    if (!watchlistItems) {
        console.error('watchlistItems konnte nicht gefunden werden.');
        return watchlistDiv;
    }

    try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`);
        const userData = await response.json();

        const watchlist = userData.watchlist || [];

        if (watchlist.length === 0) {
            watchlistItems.innerHTML = '<p class="text-center">Keine Einträge in der Watchlist.</p>';
        } else {
            watchlist.forEach((item, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-4';
                col.innerHTML = `
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">${item.name} (${item.symbol.toUpperCase()})</h5>
                            <p class="card-text">Preis: $${item.price.toLocaleString()}</p>
                            <button class="btn btn-primary btn-sm edit-btn" data-index="${index}">Bearbeiten</button>
                            <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Entfernen</button>
                        </div>
                    </div>
                `;
                watchlistItems.appendChild(col);
            });
        }

        //  Entfernen
        watchlistItems.addEventListener('click', async (e) => {
            if (e.target.classList.contains('remove-btn')) {
                const index = e.target.getAttribute('data-index');
                watchlist.splice(index, 1);

                await fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ watchlist }),
                });

                alert('Eintrag entfernt!');
                location.reload(); 
            }
        });

        //  Bearbeiten
        watchlistItems.addEventListener('click', async (e) => {
            if (e.target.classList.contains('edit-btn')) {
                const index = e.target.getAttribute('data-index');
                const newSymbol = prompt('Geben Sie das neue Kürzel der Kryptowährung ein:', watchlist[index].symbol.toUpperCase());

                if (newSymbol) {
                    try {
                        const cryptoResponse = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
                        const cryptoData = await cryptoResponse.json();

                        const crypto = cryptoData.find((c) => c.symbol.toLowerCase() === newSymbol.toLowerCase());

                        if (!crypto) {
                            alert('Ungültiges Kürzel. Bitte überprüfen Sie das eingegebene Symbol.');
                            return;
                        }

                        watchlist[index] = {
                            name: crypto.name,
                            symbol: crypto.symbol,
                            price: crypto.current_price,
                        };

                        await fetch(`http://localhost:3000/users/${user.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ watchlist }),
                        });

                        alert('Kryptowährung geändert!');
                        location.reload();
                    } catch (error) {
                        console.error('Fehler beim Abrufen der Kryptodaten:', error);
                        alert('Fehler beim Abrufen der Kryptowährungsdaten.');
                    }
                }
            }
        });
    } catch (error) {
        console.error('Fehler beim Laden der Watchlist:', error);
        watchlistDiv.innerHTML = '<h2>Fehler beim Laden der Watchlist.</h2>';
    }

    return watchlistDiv;
}

export default Watchlist;
