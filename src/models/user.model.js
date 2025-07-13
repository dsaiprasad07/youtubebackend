import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"; 

import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        fulName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudnary url of img
            required: true

        },
        coverImage: {
            type: String, // cloudnary url of img
            required: true
        },
        password : {
            type : String,
            required : [true, 'password is required']
        },
        refreshToken : {
            type : String
        },
        watcHistory : {
           type : Schema.Types.ObjectId,
           ref : "Video"
        }

    },
    { timestamps: true })


    userSchema.pre = ("save", async function(next){
        if(!isModified("password")) return next() 

        this.password = bcrypt.hash(this.password, 10) 
        next()

    })
    userSchema.methods.isPasswordCorrect = async function(password){
      return await  bcrypt.compare(password, this.password)

    } 

    userSchema.methods.genrateAccesToken = function (){
       return jwt.sign(
            {
                _id : this._id,
                email : this.email,
                userName : this.userName,
                fulName : this.fulName

            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn :  process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    } 
     userSchema.methods.genrateRefreshToken = function (){
       return jwt.sign(
            {
                _id : this._id,

            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn :  process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }


export const User = mongoose.model("User", userSchema)