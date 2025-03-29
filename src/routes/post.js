import express from "express";
import { upload } from "../config/multerConfig.js";
import { createPost, deleteAllPost, deletePostById, handleLike, updatePostById } from "../controllers/postController.js";
import { findByPage } from "../controllers/postController.js";
import { valiadte } from "../validators/zordValidator.js";
import { zordPostSchema } from "../validators/zodPostSchema.js";
import { isAuthenticated , isAdmin} from "../middleware/authMiddleware.js";


const router = express.Router()
/**
 * @swagger
 * /users:
 *  get:
 *  summery: create a new post  
 *  description: Get all users
 *  responses:
 *     200:
 *      message: sucess
 */  
router.post('/', isAuthenticated ,upload.single('image'),valiadte(zordPostSchema),createPost)
router.get('/findByPage',findByPage)
router.delete('/deleteAll',deleteAllPost)  
router.delete('/:id',isAuthenticated,deletePostById)     
router.put('/:id',isAuthenticated , isAdmin,upload.single('image'),updatePostById)
router.post('/like/:postId',isAuthenticated,handleLike)
export default router

