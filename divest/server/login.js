document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLoginSubmit);
    console.log('Login form event listener added');
});

function handleLoginSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    console.log('Login submitted with username:', username);
    localStorage.setItem('username', username);
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';
    initDB();
    initPeer(username);
}