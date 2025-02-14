const {  PostModel } = require("../model/PostModel");
require('dotenv').config();
const fs=require('fs')

const createPost = async (req, res) => {
    const { caption,_id ,existingMedia} = req.body
    // console.log(req.body)
    // console.log(existingMedia)
    const files=req.files
    let insPostObj ={
        "postCaption": caption,
        "owner":req.user.id,
    }
    if(files){
       let mediafilenames=files.map(file=>file.filename)
       if(existingMedia){
        if(Array.isArray(existingMedia)){
            insPostObj['postMedia']=[...existingMedia, ...mediafilenames]
        }
        else{
            insPostObj['postMedia']= [existingMedia,...mediafilenames]
        }
       }
       else{
        insPostObj['postMedia']= mediafilenames
       }
    }
    // console.log(files)

    try {
        if(_id){
            const updatePostObj_res = await PostModel.updateOne({_id:_id},{$set:insPostObj})
            var obj = {
                status: 1,
                message: 'Post Updated',
                updatePostObj_res
            }

        }else{
            const insPost = new PostModel(insPostObj)
            const insPostObj_res = await insPost.save()
            var obj = {
                status: 1,
                message: 'Post Created',
                insPostObj_res
            }
        }
      
        res.send(obj)

    }
    catch (err) {
      console.log(err)
      res.status(404).json({message:'Something went wrong!'})

    }
}


const readPosts = async(req, res) => {
    const {id} =req.user
    const {editId}=req.params
   
    try{
        if(editId){
         const Post=await PostModel.findOne({_id:editId})
        //  console.log(Post)
         var obj={
            status:1,
            Post,
            staticPath:"uploads/media/"

        }
        }
        else{
            const Posts=await PostModel.find({owner:id}).populate('owner','userName')
            var obj={
                status:1,
                Posts,
                staticPath:"uploads/media/"
            }
        }
       
        // console.log(obj)
        res.send(obj)
    }
    catch(err){
        console.log(err)
         res.status(400).json({message:'Error While Loading Posts!'})

    }

}

const deletePosts=async(req,res)=>{
    const {id}=req.params

    try{
        const PostMedia=await PostModel.findOne({_id:id}).select('postMedia')
        let basePath='uploads/media/'
        for(let media of PostMedia.postMedia){
            if(fs.existsSync(`${basePath+media}`)){
              fs.unlinkSync(`${basePath+media}`)
            }
        }

        const delete_response=await PostModel.deleteOne({_id:id})
       let obj={
        status:1,
        message:"Post deleted!",
        delete_response
       }
       res.send(obj)
    }
    catch(err){
        console.log(err)
        res.status(400).json({messaege:'Error Deleting Post'})
    }
}





module.exports = { createPost, readPosts,deletePosts}