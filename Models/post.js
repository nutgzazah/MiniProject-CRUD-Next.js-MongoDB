import  mongoose, { Schema } from "mongoose"

const postSchema = new Schema(
    {
        title: String,
        img: String,
        detail: String,
    },
    {
        timestamps: true
    }
)

const Post = mongoose.models.Post || mongoose.model("Post",postSchema)
export default Post