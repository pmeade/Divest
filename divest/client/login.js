document.getElementById('google-login').addEventListener('click', () => {
    window.location.href = '/auth/google';
});

// Check if the user is authenticated
fetch('/auth/check')
    .then(response => response.json())
    .then(data => {
        if (data.authenticated) {
            document.getElementById('login-overlay').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
        }
    });