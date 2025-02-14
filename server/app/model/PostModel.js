const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postCaption: {
        type: String,
        required: true,
    },
    postMedia: Array,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }], // Array of users who liked the post
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
            text: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ], // 

}, {
    timestamps: true
})
const PostModel = mongoose.model("posts", postSchema)
module.exports = { PostModel }