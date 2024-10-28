import express from 'express';
import { ExpressPeerServer } from 'peer';
import morgan from 'morgan';

const app = express();

// Use morgan middleware for logging
app.use(morgan('combined'));

// Create an Express server
const server = app.listen(9000, '0.0.0.0', () => {
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

peerServer.on('error', (error) => {
    console.error('PeerJS server error:', error);
})

app.get('/peerjs', (req, res) => {
    res.send('<h1>PeerJS is working</h1>');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

// Use the PeerJS server as middleware
app.use('/peerjs', peerServer);

// Serve a simple HTML page for testing
app.get('/', (req, res) => {
    res.send('<h1>NAT Traversal Server is running</h1>');
});