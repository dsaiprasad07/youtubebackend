import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; 



const connectDB = async () =>{
    try {
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`sai mongooDb running instanceDb ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("mongoose connection error", error)
        process.exit(1)
    }
} 

export default connectDB