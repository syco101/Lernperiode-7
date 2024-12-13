function Login() {
    const loginDiv = document.createElement('div');
    loginDiv.className = 'container mt-5';

    loginDiv.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="text-center">Login</h2>
                <form id="loginForm">
                    <div class="mb-3">
                        <input type="text" id="username" class="form-control" placeholder="Benutzername" required>
                    </div>
                    <div class="mb-3">
                        <input type="password" id="password" class="form-control" placeholder="Passwort" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    `;

    loginDiv.querySelector('#loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
            const [user] = await response.json();

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                location.hash = '#/dashboard';
            } else {
                alert('Benutzername oder Passwort ist falsch.');
            }
        } catch (error) {
            console.error('Fehler beim Login:', error);
            alert('Fehler beim Serverzugriff.');
        }
    });

    return loginDiv;
}

export default Login;
