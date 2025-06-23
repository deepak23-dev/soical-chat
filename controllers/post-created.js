import { checkLike, createPost, deleteApost, getPostData, likedlt, likeUpdate, postlikedata, updatedPost } from "../services/auth.post.service.js";

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

        const [data]=await createPost({post:imagePath,caption:caption.trim(),userId:req.user.id});
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
   try {
    
     const{id}=req.params;
    const userId= req.user.id;
    
    // let {isLiked}=req.body;
    //  console.log("Id",id);
   
    if(!req.user) return null;

  const data=await  checkLike(Number(id),userId);
// console.log("data",data);
      
//  console.log("data.postId===id",data.postId);
//   console.log("data.userId===userId",data.userId);
  if (data && data.postId === Number(id) && data.userId === userId) {
      const [like]= await likedlt(Number(id),userId);

        // console.log(like);   
     res.json({ success: false,alreadyLiked: true, });
  
    }else{

     
    const [like]= await likeUpdate(Number(id),userId);
          
        // console.log("like",like);   
     res.json({ success: true});
  

  }


   } catch (error) {
    console.log(error.message);
    
   }
//   console.log(data);
  
  
}

export const likesData=async(req,res)=>{
    const id=req.user;
    const data= await postlikedata()
    res.json({data,id})
}

