const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const { creatRoom, isValidRoom, changepassword, checkPassword } = require('./database');

const PORT = process.env.PORT || 5000;
const app = express();
const io=socketIo();
const server = http.createServer(app);
const path=require('path')
const auth=require("./authenticate")
const Router=express.Router();
module.exports={Router}
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

app.use(auth);


io.on('connection', (socket) => {
    console.log('A user connected');

   
    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });

    
    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

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
