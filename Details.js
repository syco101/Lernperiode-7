import { getCryptocurrencyById } from '../services/api.js';

async function Details(id) {
    const data = await getCryptocurrencyById(id);
    const details = document.createElement('div');
    details.className = 'container';
    details.innerHTML = `
        <h2>${data.name}</h2>
        <p>Preis: ${data.price} USD</p>
        <p>Marktkapitalisierung: ${data.market_cap}</p>
        <p>Handelsvolumen: ${data.volume}</p>
    `;
    return details;
}
export default Details;
