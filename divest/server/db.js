let db;

function initDB() {
    const request = indexedDB.open('MatchingAppDB', 1);

    request.onerror = (event) => {
        console.error('Database error:', event.target.errorCode);
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        loadPosts();
        loadAccountData();
    };

    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const postStore = db.createObjectStore('posts', { keyPath: 'id', autoIncrement: true });
        postStore.createIndex('text', 'text', { unique: false });
        postStore.createIndex('hashtags', 'hashtags', { unique: false, multiEntry: true });
        postStore.createIndex('votes', 'votes', { unique: false });

        const accountStore = db.createObjectStore('account', { keyPath: 'username' });
        accountStore.createIndex('peers', 'peers', { unique: false, multiEntry: true });
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

function loadAccountData() {
    const transaction = db.transaction(['account'], 'readonly');
    const objectStore = transaction.objectStore('account');
    const request = objectStore.get(localStorage.getItem('username'));

    request.onsuccess = (event) => {
        const accountData = event.target.result;
        if (accountData) {
            peers = accountData.peers;
        } else {
            peers = [];
        }
    };
}

function savePost(post) {
    const transaction = db.transaction(['posts'], 'readwrite');
    const objectStore = transaction.objectStore('posts');
    objectStore.put(post);
}

function saveAccountData(accountData) {
    const transaction = db.transaction(['account'], 'readwrite');
    const objectStore = transaction.objectStore('account');
    objectStore.put(accountData);
}