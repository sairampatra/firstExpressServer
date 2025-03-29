import { deleteAll, deleteCloudeFile } from "../config/multerConfig.js";
import { Post } from "../schema/post.js";
import { v2 as cloudinary } from 'cloudinary';

export const createPost = async(caption,image,user)=>{
    try {
       const post= await new Post({caption,image,user}).save()
    //    console.log(post)
       return post
    } catch (error) {
        console.log(error);
        
    }
}

export const findAllPosts = async()=>{
    try {
      const posts=  await Post.find({})
      return posts
    } catch (error) {
        console.log(error);

    }
}

export const deleteAllPost = async()=>{
try {

    const post =  await Post.deleteMany({});
    console.log('first')
    deleteAll()
    return post
    
} catch (error) {
    console.log(error);

}
}

export const deletePostById= async(id)=>{
try {
    const post =  await Post.findByIdAndDelete(id);
    if (!post) {
        throw new Error('Post ot found');
    }
    const imageUrl = post.image
    await deleteCloudeFile(imageUrl)

    return post;
    
} catch (error) {
    console.log(error);
}
}

export const findbyId = async(id)=>{
    try {
        const post=await Post.findById(id)
        // console.log(post)
        return post
    } catch (error) {
        console.log(error);

    }
}

export const findByPage = async (skip,limit) => {
    try {
        const posts= await Post.find().populate("user").skip(skip).limit(limit)
        const totalCount = await Post.countDocuments();

        return {posts,totalCount}
    } catch (error) {
        console.log(error)
    }
}       

export const updatePostById = async(id,updateobj)=>{
    try {
        const oldPost=await Post.findById(id)
        if (!oldPost) {
            throw new Error('Post not found');
        }
        const oldImageUrl = oldPost.image
        const post =Post.findByIdAndUpdate(id,updateobj,{new:true}) 
        await deleteCloudeFile(oldImageUrl)
    //    console.log(oldPost.image)
       return post
    } catch (error) {
        console.log(error)

    }
}
 
export const likeRepo = async (postid,userid) => {
    try {
        const post = await Post.findById(postid);
        post.likes.push({
            likedBy : userid,
            postid
        })
        await post.save()

        return post;
    } catch (error) {
        console.log(error)
    }
    
}