
import mongoose from "mongoose";
const commentsSchema = new mongoose.Schema({
    likes:{
        type:Array,
        default:[]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    postid:{ 
        type:String,
        required: true

    },
    data: {
        type: String,
        required: true,
    }

},{timestamps: true})

export const Comment = mongoose.model("Comments" , commentsSchema)