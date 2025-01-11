const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructure `Schema` from mongoose


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

const Reply = mongoose.model("Reply", replySchema);
module.exports = Reply;
