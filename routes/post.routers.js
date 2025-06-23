import express from 'express';
import { deletePost, getPost, getPostForUpdate, likesData, postCreated, updateLikes, updatePost } from '../controllers/post-created.js';
import { singleUpload } from '../middlewares/multer.js';


const router=express.Router();

//*for create the post
router.route("/:id/post")
.get(getPost)
.post(singleUpload,postCreated);

//* for a single post
router.route("/:id/update")
.get(getPostForUpdate)
.delete(deletePost);

router.put("/:id/:img/update",singleUpload,updatePost)

router.post("/:id/like",updateLikes);

router.get("/like",likesData)

export default router;