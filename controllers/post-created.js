import { createPost, deleteApost, getPostData, likedlt, likeUpdate, updatedPost } from "../services/auth.post.service.js";

export const getPost=async(req,res)=>{
    try {
        if(!req.user) return res.redirect("/login");
         res.render("createPost.ejs");
    } catch (error) {
        console.log(error.message);
        
    }
}

export const postCreated=async(req,res)=>{
    try {
        const{caption}=req.body;
         const imagePath = req.file ? req.file.filename : null;
        // console.log(req.file);
        
         if (!imagePath) {
               return res.status(400).send("Image is required.");
                }

        const [data]=await createPost({post:imagePath,caption,userId:req.user.id});
        // console.log(data);
        
        res.redirect("/profile");
    } catch (error) {
        console.log(error.message);
        
    }
}

export const getPostForUpdate=async(req,res)=>{
    try {
        const{id}=req.params;
       
        
        if(!req.user) return res.redirect("/login");

        const [data]=await getPostData(id);
        // console.log("post data",data);
        //  console.log("login user",req.user.id);
        //   console.log("post user",data.userId);

        if(req.user.id !=data.userId) return res.redirect("/")
        // console.log(id);
        // console.log(data);
        
         res.render("updatepost.ejs",{data});
    } catch (error) {
        console.log(error.message);
        
    }
}

export const updatePost=async(req,res)=>{
    try {
        // console.log(req.file);
        
        const{id,img}=req.params;
        const{caption}=req.body;
       const imgURL=req.file.filename;
             
        await updatedPost({id,caption,post:imgURL,img});

        res.redirect("/");
    } catch (error) {
        console.log('msg',error.message);
        
    }
}

//*delete a post



export const deletePost=async(req,res)=>{
    try {
        const{id}=req.params;
      const data=  await deleteApost({id,userId:req.user.id});
        // console.log("data",data);
      if(data === null) return  res.redirect("/");

       res.redirect("/profile");
    
      
    } catch (error) {
        console.log(error.message);
        
    }
}

//*update likes

export const updateLikes=async(req,res)=>{
    const{id}=req.params;
    let {isLiked}=req.body;
    
    try {
        if(isLiked){
    const [like]= await likeUpdate(Number(id));

        // console.log(like);   
     res.json({ success: true, like});
        }else{
            const [like]= await likedlt(Number(id));

        // console.log(like);   
     res.json({ success: false, like});
        }
    
    
    } catch (error) {
        console.log(error.message);
        
    }
}

