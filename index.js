const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const defaultMessages = [
    "Hello! How can I help you?",
    "What brings you here today?",
    "Let me know if you have any questions.",
    "I'm here to assist you!",
    "Feel free to ask anything.",
    "How can I make your day better?",
    "Need help with something specific?",
    "I'm just a message away!",
    "What do you want to know?",
    "Thanks for reaching out!"
];

let messageCount = 0;

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('message', (msg) => {
        console.log(`Received message: ${msg}`);

        if (messageCount < defaultMessages.length) {
            // Send a default message back to the client
            socket.emit('message', defaultMessages[messageCount]);
            messageCount++;
        } else {
            socket.emit('message', "I've reached the limit of responses!");
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Serve static files from the public directory
app.use(express.static('public'));

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
