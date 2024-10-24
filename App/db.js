let db;

function initDB() {
    const request = indexedDB.open('MatchingAppDB', 1);

    request.onerror = (event) => {
        console.error('Database error:', event.target.errorCode);
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        loadPosts();
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const objectStore = db.createObjectStore('posts', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('text', 'text', { unique: false });
        objectStore.createIndex('hashtags', 'hashtags', { unique: false, multiEntry: true });
        objectStore.createIndex('votes', 'votes', { unique: false });
    };
}

function loadPosts() {
    const transaction = db.transaction(['posts'], 'readonly');
    const objectStore = transaction.objectStore('posts');
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
        const postContainer = document.getElementById('post-container');
        event.target.result.forEach(post => {
            posts.push(post);
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.dataset.id = post.id;
            postElement.innerHTML = `<p>${post.text}</p><p>${post.hashtags.join(' ')}</p>`;
            postContainer.appendChild(postElement);
        });

        currentPost = postContainer.lastElementChild;
    };
}

function savePost(post) {
    const transaction = db.transaction(['posts'], 'readwrite');
    const objectStore = transaction.objectStore('posts');
    objectStore.put(post);
}