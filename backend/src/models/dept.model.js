import { Schema } from "mongoose";
import mongoose from "mongoose";

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

export const Dept = mongoose.model("Dept", deptSchema);