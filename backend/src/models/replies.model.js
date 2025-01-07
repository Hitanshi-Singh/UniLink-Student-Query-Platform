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
    }
   },{timestamps:true} 
)

export const Reply = mongoose.model("Reply", replySchema);