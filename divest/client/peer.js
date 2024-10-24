const peer = new Peer(undefined, {
    host: '3.142.92.89',
    port: 9000,
    path: '/peerjs'
});

peer.on('open', id => {
    console.log('My peer ID is: ' + id);
    // Connect to default peers, friends, and random peers
});

peer.on('connection', conn => {
    conn.on('data', data => {
        console.log('Received', data);
    });
});

function connectToPeer(peerId) {
    const conn = peer.connect(peerId);
    conn.on('open', () => {
        conn.send('Hello!');
    });
}

// Example function to add a post
function addPost(post) {
    fetch('http://3.142.92.89:9000/api/posts', {
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