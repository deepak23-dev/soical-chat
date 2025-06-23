import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createChat } from '../services/auth.socket.js';


const app=express();
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST']
// }));
// const PORT=8080;

const server = createServer(app);
const io = new Server(server, {
  // cors: {
  //   origin: 'http://localhost:3000',
  //   methods: ['GET', 'POST']
  // }
});

let users={};

io.on('connection', (socket) => {
  // console.log('socket object is:', socket.handshake.query); // Inspect the whole object
 const {userId,online} = socket.handshake.query;
 
   if (userId) {
    users[userId] = socket.id; // Track user ID -> socket ID
    console.log(`User connected: ${userId} (socket: ${socket.id})`);
  }
  
  socket.broadcast.emit("online",online);
  // console.log('A user connected:', socket.id); 
 
  // socket.emit("id",socket.id);
  socket.on('chat message',async( {msg,room})=>{
  //  console.log(users[room]);
   await createChat({senderId:userId,reciverId:room,message:msg}); 
    socket.to(users[room]).emit("recived-msg",{msg,room,senderId: userId});
    
    // console.log(
    //   msg
    // );

    socket.emit("recived-msg", {msg,room,senderId: userId})
    
  });
console.log(users);

  socket.on("disconnect",()=>{
    console.log("user disconnect",socket.id);
    
     for (const [id, sid] of Object.entries(users)) {
      if (sid === socket.id) {
        delete users[id];
        break;
      }
    }
 
  })
});

// server.listen(PORT, () => {
//   console.log(`listen on port ${PORT}`);
// });

export{app,server}