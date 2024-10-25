import fetch from 'node-fetch';
import Peer from 'simple-peer';
import wrtc from 'wrtc';

const peer = new Peer({
    initiator: true,
    wrtc: wrtc
});

peer.on('signal', data => {
    console.log('Signal data:', data);
    // Send this signal data to the other peer
});

peer.on('connect', () => {
    console.log('Connected to another peer');
    peer.send('Hello from dummy peer!');
});

peer.on('data', data => {
    console.log('Received data:', data);
});

peer.on('close', () => {
    console.log('Connection closed');
});

peer.on('error', err => {
    console.error('Peer error:', err);
});

// Example function to add a post
function addPost(post) {
    console.log('Adding post:', post);
    fetch('http://your-nat-server-public-dns:9000/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Post added:', data);
    })
    .catch(err => {
        console.error('Error adding post:', err);
    });
}

// Example function to get all posts
function getPosts() {
    console.log('Fetching all posts');
    fetch('http://your-nat-server-public-dns:9000/api/posts')
    .then(response => response.json())
    .then(data => {
        console.log('Posts:', data);
    })
    .catch(err => {
        console.error('Error fetching posts:', err);
    });
}

// Keep the process running
setInterval(() => {}, 1000);