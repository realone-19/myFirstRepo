const express = require('express');
const http = require('http');
const path= require('path');
const app = express();


server = http.createServer(app);
PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Socket
/* const chat = require('express')();


chat.get('/', (req, res)=>{
   // console.log(chat.mountpath)
    io = require('socket.io')(server);
    io.on('conntection', (socket)=>{
        console.log('new Connection');
        socket.on('message', (msg)=>{
            console.log(msg);
        })

    })

    res.end();
}) */


/* const chat = require('./chat');
app.use('/container', chat); */



app.use(express.static(path.join(__dirname, './client')));



const io = require('socket.io')(server);
io.on('connection', (socket)=>{
    console.log('A user just connected');
    socket.emit('message', 'welcome to chat');
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg);
        console.log(msg);
    })

    socket.on('disconnect', ()=>{
        console.log('A user has left the chat');
    })

})


/* app.use('/container', (req,res)=>{    
    console.log('inside chat');
    io.on('conntection', (socket)=>{
        console.log('new Connection');
        socket.on('message', (msg)=>{
            console.log(msg);
        })

    })

    res.end();
}); */

// Routes
const registeruser = require('./routes/register');
const loginuser = require('./routes/login');
app.use('/login', loginuser);
app.use('/users', registeruser);


//initialise mongoose
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/myproject', {useNewUrlParser: true});

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', ()=>{
    console.log('connected to mongo db');
})


app.get('/', (req, res) =>{
    res.send(`<div style="width:100%; height:20%; background-color:black; display:flex; justify-content:center">
                <h1 style="color: green;">WORK IN PROGRESS</h1>
            </div>`);
});

server.listen(PORT, () => { console.log(`App listen on port ${PORT}`); })
