const Peer = require('peerjs-nodejs');
const fetch = require('node-fetch');

const peer = new Peer(undefined, {
    host: '3.142.92.89',
    port: 9000,
    path: '/peerjs'
});

peer.on('open', id => {
    console.log('Dummy peer ID is: ' + id);
    // Connect to other peers and maintain a live body of posts
    connectToPeers();
});

peer.on('connection', conn => {
    conn.on('data', data => {
        console.log('Received', data);
        // Handle received data (e.g., store posts)
    });
});

function connectToPeers() {
    // Example: Connect to another dummy peer
    const conn = peer.connect('another-dummy-peer-id');
    conn.on('open', () => {
        conn.send('Hello from dummy peer!');
    });
}

// Example function to add a post
function addPost(post) {
    fetch('http://3.142.92.89/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post added:', data);
    });
}

// Example function to get all posts
function getPosts() {
    fetch('http://3.142.92.89:9000/api/posts')
    .then(response => response.json())
    .then(data => {
        console.log('Posts:', data);
    });
}