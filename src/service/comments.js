import { createcomment, likeComment } from "../repository/commentRepo.js";

 
export const commentsService = async (postid,userid,commentData) => {

    const comment = createcomment(postid,userid,commentData)
    return comment
}
export const likeCommentsService = async (postid,userid,commentid) => {

    const comment = likeComment(postid,userid,commentid)
    return comment
}


