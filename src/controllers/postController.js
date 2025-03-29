import {
  createPostService,
  deletePostService,
  findByPageService,
  likeService,
  upgatePostServer,
} from "../service/postService.js";

import { deleteAllPost as dlt } from "../repository/postRepo.js";

export const createPost = async (req, res) => {
  // console.log(req.file);
  console.log(req.user._id)
  if (!req.file || !req.file.path) {
    return res.status(400).json({
      success: false,
      message:"Image is required"

    })
  }
  const post = await createPostService({
    caption: req.body.caption,
    image: req.file.path,
    user: req.user._id
  });
  // console.log(req.body)
  res.status(201).json({
    success: true,
    message: "posted",
    data: post,
  });
};

export const deleteAllPost = async (req, res) => {
  const post = await dlt();
  res.json({
    success: true,
    message: "deleated",
    data: post,
  });
};

export const findByPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const postInfoObj = await findByPageService({ page, limit });
  res.status(200).json(postInfoObj);
};

export const deletePostById = async (req, res) => {
  try {
    const postid = req.params.id;
    const user = req.user;
    // console.log(user)
    const post = await deletePostService(postid,user);
    if (!post) {
      return res.status(404).json({
        sucess: false,
        message: "post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "deleated",
      data: post,
    });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({
        sucess:false,
        maessage:error.maessage
      })
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

export const updatePostById = async (req, res) => {
  try {
    console.log(req.file)
    const postid = req.params.id;
    const upadteObj = req.body;
    if (req.file) {
      upadteObj.image = req.file.path;
    }
    const post = await upgatePostServer(postid, upadteObj);
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

export const handleLike = async (req,res) => {
  try {
    const postid = req.params.postId
    const userid = req.user._id
    const post = likeService(postid,userid)
   return res.status(201).json({
      success: true,        
      message: "Post updated successfully",
      data: post
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}