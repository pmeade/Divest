document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display social graph
    fetch('/api/social_graph')
        .then(response => response.json())
        .then(graph => {
            const graphContainer = document.getElementById('graph-container');
            graph.users.forEach(user => {
                const userElement = document.createElement('div');
                userElement.className = 'user';
                userElement.innerHTML = `
                    <p>${user.name}</p>
                    <div class="posts">
                        ${user.posts.map(post => `<p>${post.text}</p>`).join('')}
                    </div>
                `;
                graphContainer.appendChild(userElement);
            });
        });
});