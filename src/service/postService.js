import { createPost as createPostRepo, deletePostById, findbyId, findByPage as findByPageRepo, likeRepo, updatePostById } from "../repository/postRepo.js";

export const createPostService= async(createPostObject)=>{
    const caption = createPostObject.caption?.trim()
    const image = createPostObject.image 
    const user = createPostObject.user 
    
    const post =await createPostRepo(caption,image,user)
    return post
}


export const findByPageService = async (findBypageObject) => {
   const page =  findBypageObject.page
  const limit=   findBypageObject.limit
    const skip = (page-1)*limit
    
    const postsInfoObj = await findByPageRepo(skip,limit)
   const posts = postsInfoObj.posts
   const totalCount = postsInfoObj.totalCount

    const totalPages = Math.ceil(totalCount / limit);
return {
    totalCount,      
    totalPages,      
    currentPage: page, 
    posts,   
}

}

export const deletePostService = async (id,user) => {
const post = await findbyId(id)
console.log(user) 
if(post.user != user._id){
    throw{
        status: 401,
        message:"Unauthorized"
    }
}
    const resronse = await deletePostById(id);
    return resronse;
}

export const upgatePostServer = async (id,updateObj) => {

    const  post  = await updatePostById(id,updateObj)
    return post
}

export const likeService = async (postid,userid) => {

    const post = await likeRepo(postid,userid)
    return post 
}