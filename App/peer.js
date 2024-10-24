let peer;
let conn;
let peers = [];
const posts = [];

function initPeer(username) {
    peer = new Peer(username, {
        host: 'YOUR_NAT_SERVER_IP_OR_DOMAIN', // Replace with your NAT server's IP or domain
        port: 9000,
        path: '/peerjs',
        secure: true // Use secure connection if your NAT server supports HTTPS
    });

    peer.on('open', (id) => {
        console.log('My peer ID is: ' + id);
        connectToPeers();
    });

    peer.on('connection', (connection) => {
        conn = connection;
        conn.on('data', (data) => {
            console.log('Received', data);
            handleReceivedPost(data);
        });
    });
}

function connectToPeers() {
    const peerIds = ['peer-seed-1', 'peer-seed-2', 'peer-seed-3']; // Replace with actual peer IDs
    peerIds.forEach(peerId => {
        const connection = peer.connect(peerId);
        connection.on('open', () => {
            console.log('Connected to peer: ' + peerId);
            peers.push(peerId);
            connection.on('data', (data) => {
                console.log('Received from peer:', data);
                handleReceivedPost(data);
            });
        });
    });
}

function handleReceivedPost(post) {
    posts.push(post);
    console.log('Post received and stored:', post);
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.dataset.id = post.id;
    postElement.innerHTML = `<p>${post.text}</p><p>${post.hashtags.join(' ')}</p>`;
    document.getElementById('post-container').appendChild(postElement);
}

function sharePost(post) {
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