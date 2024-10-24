const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

// Create an Express server
const server = app.listen(9000, () => {
    console.log('NAT Traversal server is running on port 9000');
});

// Create a PeerJS server
const peerServer = ExpressPeerServer(server, {
    path: '/peerjs'
});

// Use the PeerJS server as middleware
app.use('/peerjs', peerServer);

// Serve a simple HTML page for testing
app.get('/', (req, res) => {
    res.send('<h1>NAT Traversal Server is running</h1>');
});