const mongoose = require("mongoose");
const { Schema } = mongoose;


const deptSchema= new Schema(
   {
    dept_name: {
        type: String,
        required:true
    },
    dept_head: {
        type: String,
    },
    dept_email: {
        type: String
    },
    total_students: {
        type: Number,
    }
   }
)

const Dept = mongoose.model("Dept", deptSchema);
module.exports={Dept}
