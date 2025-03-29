import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { createComment, likeComment } from "../controllers/commentsController.js";
 const router = express.Router()

router.post('/createComment/:postId', isAuthenticated ,createComment)
router.post('/likeComment/:postId/:commentid', isAuthenticated ,likeComment)

export default router;