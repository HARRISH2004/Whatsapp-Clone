// node server for whatsapp clone which will handle socket io connection
const io = require('socket.io')(3000)

const users={};

io.on('connection',socket=> {   
    //if any user want to join it take name and store in form of id      
    socket.on('new-user-joined', name => {     
        console.log('New user', name)
        users[socket.id]= name;              
        socket.broadcast.emit('user-joined', name);
    });

    //if someone sends a message ,boradcast to other joined people
    socket.on('send',message => {             
        socket.broadcast.emit('receive',{message: message, name:user[socket.id]});
    });

    //when anybody left ,broadcast to others user
    socket.on('disconnect',message => {       
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });    
})




















// const express=require('express');
// const app=express();

// const cors=require('cors');
// app.use(cors({
//     origin: "http://127.0.0.1:5500/app.html",
// }))

// const { Server } = require("socket.io");

// const io = new Server({
//     cors: {
//         origin: "http://127.0.0.1:5500",
//         methods: ["GET", "POST"]
//     }
// });
        