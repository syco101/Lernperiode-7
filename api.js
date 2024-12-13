

const API_URL = 'http://localhost:3000';

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}

export async function getWatchlist() {
  const response = await fetch(`${API_URL}/watchlist`);
  return response.json();
}

export async function addToWatchlist(coin) {
  const response = await fetch(`${API_URL}/watchlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(coin),
  });
  return response.json();
}

export async function deleteFromWatchlist(id) {
  await fetch(`${API_URL}/watchlist/${id}`, { method: 'DELETE' });
}

export async function updateWatchlist(id, updatedCoin) {
  const response = await fetch(`${API_URL}/watchlist/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCoin),
  });
  return response.json();
}








const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-dbJocabn97S5B4FmJWcjRDgk'; //  API-Schlüssel

export async function getCryptocurrencies() {
    try {
       
        const response = await fetch(
            `${API_BASE_URL}/coins/markets?vs_currency=usd&x_cg_demo_api_key=${API_KEY}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            }
        );
        if (!response.ok) {
            throw new Error(`API-Fehler: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der API-Daten:', error.message);
        return [];
    }
}

