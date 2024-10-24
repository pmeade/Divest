document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display user data
    fetch('/api/user_data')
        .then(response => response.json())
        .then(data => {
            const securityContainer = document.getElementById('security-container');
            securityContainer.innerHTML = `
                <p>Username: ${data.username}</p>
                <p>Email: ${data.email}</p>
                <button id="block-user">Block User</button>
            `;
        });

    // Handle block user
    document.getElementById('block-user').addEventListener('click', () => {
        const userId = prompt('Enter user ID to block:');
        fetch(`/api/block_user/${userId}`, {
            method: 'POST'
        }).then(() => {
            alert('User blocked');
        });
    });
});