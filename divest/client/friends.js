document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display friends
    fetch('/api/friends')
        .then(response => response.json())
        .then(friends => {
            const friendsContainer = document.getElementById('friends-container');
            friends.forEach(friend => {
                const friendElement = document.createElement('div');
                friendElement.className = 'friend';
                friendElement.innerHTML = `
                    <p>${friend.name}</p>
                    <button class="unfriend" data-id="${friend.id}">Unfriend</button>
                `;
                friendsContainer.appendChild(friendElement);
            });
        });

    // Handle unfriend
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('unfriend')) {
            const friendId = event.target.getAttribute('data-id');
            fetch(`/api/friends/${friendId}`, {
                method: 'DELETE'
            }).then(() => {
                // Remove friend from UI
                event.target.parentElement.remove();
            });
        }
    });
});