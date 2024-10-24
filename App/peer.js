let peer;
let conn;

function initPeer(username) {
    peer = new Peer(username, {
        host: '0.peerjs.com',
        port: 443,
        path: '/',
        secure: true
    });

    peer.on('open', (id) => {
        console.log('My peer ID is: ' + id);
    });

    peer.on('connection', (connection) => {
        conn = connection;
        conn.on('data', (data) => {
            console.log('Received', data);
            handleReceivedPost(data);
        });
    });
}

function connectToPeer(peerId) {
    conn = peer.connect(peerId);
    conn.on('open', () => {
        console.log('Connected to peer: ' + peerId);
    });

    conn.on('data', (data) => {
        console.log('Received', data);
        handleReceivedPost(data);
    });
}

function handleReceivedPost(post) {
    posts.push(post);
    savePost(post);
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.dataset.id = post.id;
    postElement.innerHTML = `<p>${post.text}</p><p>${post.hashtags.join(' ')}</p>`;
    document.getElementById('post-container').appendChild(postElement);
}