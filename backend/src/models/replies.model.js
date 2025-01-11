const mongoose =require("mongoose");
const {Schema}= mongoose;
const replySchema= new mongoose.Schema(
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

module.exports = mongoose.model("Reply", replySchema);
