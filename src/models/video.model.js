import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudnary for video url 
            required: true

        },
        thumbnail: {
            type: String, //cloudnary for image url 
            required: true
        }, 
        title: {
            type: String,
            required: true
        },
         discription : {
            type : String, 
            required : true
        },
        duration : {
            type : Number,
            required : true
        },
        views : {
            type : Number, 
            default : 0
        },
        isPublished :{
            type : Boolean,
            default : true
        }, 
        owner : {
            type : Schema.Types.ObjectId, 
            ref : "User"
        }
    },
    { timestamps: true }
)


export const Video = mongoose.model("VIdeo", videoSchema)