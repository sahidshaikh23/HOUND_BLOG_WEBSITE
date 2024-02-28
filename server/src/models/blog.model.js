import { User } from './user.model.js'
import { Schema,model } from 'mongoose'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    totalLikes:{
        type: Number,
        default: 0
    },
    commentsCount:{
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    visitedCount:{
        type: Number,
        default: 0
    },
    category:{
        type: String,
        required: true
    }
},{timestamps: true})



blogSchema.plugin(mongooseAggregatePaginate)

export const Blog = model('Blog', blogSchema)