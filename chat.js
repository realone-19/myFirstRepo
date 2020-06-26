/* const http = require('http');
const express = require('express');
const router = express.Router();

//socketio setup
chat = require('express')();
server = http.createServer(chat);
io = require('socket.io')(server);

router.route('/chat')
    .get((req, res)=>{    
        io.on('conntection', ()=>{
            console.log('new Connection');
        })

        res.end();

})



module.exports = router; */