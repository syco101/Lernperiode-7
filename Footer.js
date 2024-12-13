function Footer() {
    const footer = document.createElement('footer');
    footer.className = 'bg-dark text-white text-center py-3 mt-auto'; // Styling für Footer
    footer.innerHTML = `<p>&copy; 2024 Krypto Tracker. Alle Rechte vorbehalten.</p>`;
    return footer;
}

export default Footer;
