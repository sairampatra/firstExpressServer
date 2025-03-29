import {Comment} from "../schema/comments.js"

export const createcomment = async (postid,userid,commentData) => {
    try {
        const newComment = await new Comment({
            postid,
            user:userid,
            data:commentData
        }).save()
        return newComment
    } catch (error) {
        console.log(error)
    }
}

export const likeComment = async (postid,userid,commentid) => {
    const comment = await Comment.findById(commentid)
    // console.log(req.params.postId,req.user._id , req.params.commentid)
    comment.likes.push({
        likedBy : userid,
            postid,
            commentid

    })
    await comment.save()
}