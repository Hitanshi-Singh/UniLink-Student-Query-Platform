import { Schema } from "mongoose";
import mongoose from "mongoose";

const deptSchema= new Schema(
   {
    dept_no: {
        type: Number,
        required:true,
    },
    dept_name: {
        type: String,
        required:true
    },
   }
)

export const Dept = mongoose.model("Dept", deptSchema);