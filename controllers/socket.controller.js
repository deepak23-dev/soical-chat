import { createChat, getAllmessages } from "../services/auth.socket.js";

export const userMessage=async(req,res)=>{
    try {
           const user=req.user;
           const room=req.params.id;
            const name=req.query.name;
        //    console.log("user",userId);
           
        //    console.log("room",room);
           
           const msg=await getAllmessages({userId:user.id,room});
        //    console.log("user msg",msg);
           
        //    console.log("req.params.id",userId);
           
          res.render("user.ejs",{user,room,msg,name});
           //  console.log(filterData);
           
       } catch (error) {
           console.log(error.message);
           
       }
}



// export const storeChatData=async(req,res)=>{
//     try {
//          const senderId=req.user.id;
//          const {reciverId,message}=req.body;
//          console.log("msg",message);
         
//        const [data]=await createChat({senderId,reciverId,message}); 
//     //    console.log(data);
//        res.redirect(`/${reciverId}/socket`);
       
//     } catch (error) {
//         console.log(error.message);
//     }
  
// }