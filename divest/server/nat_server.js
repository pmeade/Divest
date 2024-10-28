import express from 'express';
import { ExpressPeerServer } from 'peer';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// Use morgan middleware for logging
app.use(morgan('combined'));

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Create an Express server
const server = app.listen(9000, '::', () => {
    console.log('NAT Traversal server is running on port 9000');
});

// Create a PeerJS server
const peerServer = ExpressPeerServer(server, {
    path: '/peerjs'
});

// Add logging to verify PeerJS server initialization
peerServer.on('connection', (client) => {
    console.log('PeerJS client connected:', client.id);
});

peerServer.on('disconnect', (client) => {
    console.log('PeerJS client disconnected:', client.id);
});

// Use the PeerJS server as middleware
app.use('/peerjs', peerServer);

// Serve a simple HTML page for testing
app.get('/', (req, res) => {
    res.send('<h1>NAT Traversal Server is running</h1>');
});