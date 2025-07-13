import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import app from './app.js';



import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})


connectDB() 

.then(() => {
    app.listen( process.env.PORT || 8000, () => {
        console.log("server running succuessfully at", `${process.env.PORT}`)

    })
    
    
}).catch((err) => {
    console.log("server not  running ", err)
});