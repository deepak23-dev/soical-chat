 const socket = io( {
  query: {
    userId: userId,
    online:name
  }
}
);

  const form = document.getElementById('form');
  const input = document.getElementById('input');
    const room = document.getElementById('room');
  // const userIds=document.getElementById('userId');
   const msg=document.getElementById('msg');


  socket.on("online",(s)=>{
    alert(`${s} is online`);
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', {msg:input.value,room:room.value});
      input.value = '';
    }
  });

  socket.on("recived-msg",(s)=>{
  //  console.log(room.value);
  //  console.log("room",s.room);
  //  console.log("userid",s.senderId);
   
   if (s.senderId === room.value || s.room === room.value) {
     let li=document.createElement('li');
     li.innerHTML=s.msg;
     msg.appendChild(li);
   }
  })

