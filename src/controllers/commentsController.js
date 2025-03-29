import { commentsService, likeCommentsService } from "../service/comments.js";

export const createComment = async (req,res) => {
    try {
        const comment =  await commentsService(req.params.postId,req.user._id , req.body.data)
        return res.status(201).json({
            success: true,        
      message: "comment  successfully",
      data: comment
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
    }
}
export const likeComment = async (req,res) => {
    try {
        const comment =  await likeCommentsService(req.params.postId,req.user._id , req.params.commentid)
        // console.log(req.params.postId,req.user._id , req.params.commentid)
        return res.status(201).json({
            success: true,        
      message: "comment liked successfully",
      data: comment
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
    }
}
