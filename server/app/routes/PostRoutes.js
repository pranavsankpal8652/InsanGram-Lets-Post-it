const express=require('express')
const { verifyToken } = require('../Middleware/Auth')
const {  getPosts, addComment,  viewCommentsandLikes, updateLikes } = require('../controller/PostsController')

const PostRoutes=express.Router()


PostRoutes.get('/get',verifyToken, getPosts)

PostRoutes.post('/comments/add',verifyToken, addComment)

PostRoutes.get('/activities/view/:postId',verifyToken, viewCommentsandLikes)

PostRoutes.post('/likes/update/:postId',verifyToken,updateLikes)





module.exports={PostRoutes}