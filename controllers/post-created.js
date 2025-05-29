import { createPost } from "../services/auth.post.service.js";

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

