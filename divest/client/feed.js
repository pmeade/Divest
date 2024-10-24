document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display relevant posts
    fetch('/api/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            const feedContainer = document.getElementById('feed-container');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <p>${post.text}</p>
                    <p>Category: ${post.category}</p>
                    <button class="agree">✔️</button>
                    <button class="maybe">❓</button>
                    <button class="disagree">❌</button>
                    <select class="relevancy">
                        <option value="normal">Normal</option>
                        <option value="care-a-lot">Care a lot</option>
                        <option value="dont-care">Don't Care</option>
                    </select>
                `;
                feedContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});