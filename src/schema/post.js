import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        minLength:1,
        maxLength:2200,
        required: false

    },
    image:{
        type: String,
      
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, // Use 'type' (lowercase 't')
    ref: 'User', // Ensure 'User' matches your model name
    required: true // Use 'required' (lowercase 'r')
    },
    likes: {
        type: Array,
        default: []
    },
   
},{timestamps: true})  

export const Post = mongoose.model('Post',postSchema)
