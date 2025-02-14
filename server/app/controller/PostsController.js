const { PostModel } = require("../model/PostModel")

const getPosts = async (req, res) => {
    const currentUser=req.user.id
    try {
        const Posts = await PostModel.find({owner:{$ne:currentUser}}).populate('owner', 'userName')
        let obj = {
            status: 1,
            Posts,
            staticPath: "uploads/media/"
        }
        // console.log(obj)
        res.send(obj)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Error While Loading Posts!' })

    }

}

const addComment = async (req, res) => {
    const { newComment, postId } = req.body
    // console.log(req.body)
    const Comment = 
        {
            user: req.user.id,
            text: newComment,
        }
    
    try {
        const post = await PostModel.findOne({ _id: postId })
        if (!post) return res.status(400).json({ message: 'Post not present' })
        post.comments.push(Comment)
        await post.save()

        res.status(200).json({ message: 'Comment Added' })
    }
    catch (err) {
        console.log(err)
        res.status(400)
    }
}

const viewCommentsandLikes=async(req,res)=>{
    const {postId}=req.params
    // console.log(postId)
    try {
        const post = await PostModel.findById(postId)
        .populate("comments.user", "userName") // Populate 'username' from 'userId'
        .exec();
        if(post.likes.includes(req.user.id)){
            var liked=true
        }
        res.json({ success: true, comments: post.comments, likes:post.likes.length,liked});
    }
    catch (err) {
        console.log(err)
        res.status(400)
    }

}

const updateLikes=async(req,res)=>{
    const {postId}=req.params
    // console.log(postId)
    try{
        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });
        // console.log(likes)
        const LikedUsers=post.likes
        if(LikedUsers.includes(req.user.id)){
            const userIndex=LikedUsers.indexOf(req.user.id)
            LikedUsers.splice(userIndex,1)
        }
        else{
            LikedUsers.push(req.user.id)
        }
        // console.log(post)
        await post.save()
        res.status(200).json({message:'liked'})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:'problem'})
    }

}


module.exports = { getPosts, addComment,viewCommentsandLikes,updateLikes }