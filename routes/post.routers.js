import express from 'express';
import { getPost, postCreated } from '../controllers/post-created.js';
import { singleUpload } from '../middlewares/multer.js';

const router=express.Router();

router.route("/:id/post")
.get(getPost)
.post(singleUpload,postCreated);



export default router;