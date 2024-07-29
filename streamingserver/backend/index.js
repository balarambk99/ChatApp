const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { creatRoom, isValidRoom, changepassword, checkPassword } = require('./database');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.post('/join', (req, res) => {
    const { roomid, joinpassword } = req.body;
    console.log(`${roomid} ${joinpassword}`);
});

app.post('/updatepass', (req, res) => {
    const { roomid, joinpassword } = req.body;
    const data = { roomid, joinpassword };
    console.log(` ${data.joinpassword} ${data.roomid}`);
    changepassword(data);
});

app.post('/updatehost', (req, res) => {
    const { roomid, hostpassword } = req.body;
    const data = { roomid, hostpassword };
    isValidRoom(data);
    checkPassword(data);
    changepassword(data);
    res.send('hello');
});

app.post('/host', async (req, res) => {
    const { roomid, joinpassword, hostpassword } = req.body;
    const data = { roomid, hostpassword, joinpassword };
    creatRoom(data);
    res.json(data);
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle offer
    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });

    // Handle answer
    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

    // Handle ICE candidates
    socket.on('ice-candidate', (candidate) => {
        socket.broadcast.emit('ice-candidate', candidate);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Socket is running on ${PORT}`);
});
