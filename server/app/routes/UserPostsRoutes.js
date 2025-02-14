const express=require('express')
const { verifyToken } = require('../Middleware/Auth')
const { createEvent, readEvents, deleteEvents, createPost, readPosts, deletePosts } = require('../controller/UserPostController')
const { upload } = require('../config/multer')

const OwnerPostRoutes=express.Router()


OwnerPostRoutes.post('/create',verifyToken,upload.array('media',5),createPost)

OwnerPostRoutes.get('/read/:editId?',verifyToken,readPosts)


OwnerPostRoutes.delete('/delete/:id',verifyToken,deletePosts)



module.exports={OwnerPostRoutes}