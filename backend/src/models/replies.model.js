import { Schema } from "mongoose";
import mongoose from "mongoose";

const replySchema= new Schema(
   {
    content: {
        type: String,
        required:true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: "Answer"
    }
   },{timestamps:true} 
)

export const Reply = mongoose.model("Reply", replySchema);