
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    emailError.textContent = '';
    passwordError.textContent = '';

    // Validation
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Invalid email format';
        return;
    }

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        return;
    }

    if (username !== 'emilys') {
        alert('Username must be \"emilys\"');
        return;
    }

    // Send credentials to API
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, expiresInMins: 30 })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/home';
    } else {
        alert('Login failed. Please check your credentials.');
    }
});

// Redirect if logged in
if (localStorage.getItem('authToken')) {
    window.location.href = '/home';
}
