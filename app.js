// Nicolas Peñaloza Chat test aplication for practice.
'use strict';

// Npm packages
const express = require('express');
const SocketIO = require('socket.io');
const path = require('path');
const app = express();


// Config
const config = require('./config.json');

if (config && config != "undefined") {
    app.set('port', config.port);
} else {
    app.set('port', process.env.port || 3000);
}

// Init
const server = app.listen(app.get('port'), () => console.log('Server on port', app.get('port')));
const io = SocketIO(server);


// static files
app.use(express.static(path.join(__dirname + '/public/')));


// Global vars
let idTMPUser = 0;
let chatRooms = [];
// events

io.on('connection', (socket_) => {
    console.log('New user', idTMPUser, socket_.id);
    idTMPUser ++;

    socket_.on('onChatRoomCreated', (data_) => {
        chatRooms.push({
            "id": data_.id,
            "socket": socket_.id
        });
        console.log(`Usuario en el socket ${socket_.id} asignado al chat ${data_.id}`);
    });

    socket_.on('mensaje:enviado', (mensaje_) => {
        console.log('Nuevo Mensaje: ', mensaje_.msj, 'por el usuario', mensaje_.user, 'en la sala con el ID:', mensaje_.id);
        
        io.sockets.emit('mensaje:recibido', {
            "user": mensaje_.user,
            "id": mensaje_.id,
            "text": mensaje_.msj,
            "socket":socket_.id
        });
    
    });

});

