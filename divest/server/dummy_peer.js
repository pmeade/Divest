const Peer = require('peerjs');
const posts = []; // In-memory database of posts

// Initialize PeerJS with a specific ID
const peer = new Peer('peer-seed-1', {
    host: 'YOUR_NAT_SERVER_IP_OR_DOMAIN', // Replace with your NAT server's IP or domain
    port: 9000,
    path: '/peerjs',
    secure: true // Use secure connection if your NAT server supports HTTPS
});

peer.on('open', (id) => {
    console.log('Dummy peer ID is: ' + id);
    connectToPeers();
});

peer.on('connection', (connection) => {
    connection.on('data', (data) => {
        console.log('Received', data);
        handleReceivedPost(data);
    });
});

function connectToPeers() {
    const peerIds = ['peer-seed-2', 'peer-seed-3']; // Replace with actual peer IDs
    peerIds.forEach(peerId => {
        const connection = peer.connect(peerId);
        connection.on('open', () => {
            console.log('Connected to peer: ' + peerId);
            connection.on('data', (data) => {
                console.log('Received from peer:', data);
                handleReceivedPost(data);
            });
        });
    });
}

function handleReceivedPost(post) {
    // Store the received post in the in-memory database
    posts.push(post);
    console.log('Post received and stored:', post);
}

// Function to add a post (for testing purposes)
function addPost(post) {
    posts.push(post);
    console.log('Post added:', post);
    gossipPost(post);
}

function gossipPost(post) {
    peer.connections.forEach(connections => {
        connections.forEach(connection => {
            connection.send(post);
        });
    });
}

// Example usage (for testing purposes)
addPost({ text: 'Hello, world!', hashtags: ['#example'], votes: { upvote: 0, downvote: 0 } });