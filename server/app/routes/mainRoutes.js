const express=require('express')
const { AuthRoutes } = require('./AuthRoutes')

const { OwnerPostRoutes } = require('./UserPostsRoutes')
const {  PostRoutes } = require('./postRoutes')



const mainRoutes=express.Router()

mainRoutes.use('/user',AuthRoutes)

mainRoutes.use('/ownerPosts',OwnerPostRoutes)

mainRoutes.use('/posts',PostRoutes)





module.exports={mainRoutes}