const express = require('express')
const { registerUser, loginUser, userAccess, resetPassword, generate_resetPassword_Link } = require('../controller/AuthControlller')
const { checkUser, findUser, verifyToken, reset_password_find_user, forgot_password_find_user, forgot_password_validation, verifyToken_for_resetPass, check_email } = require('../Middleware/Auth')
const AuthRoutes = express.Router()

AuthRoutes.post('/register', checkUser, registerUser)

AuthRoutes.post('/login', findUser, loginUser)

AuthRoutes.get('/access', verifyToken, (req, res) => res.json({ message: `Welcome,${req.user.userName}!` }))


AuthRoutes.post('/forgot/pass', check_email, generate_resetPassword_Link)

AuthRoutes.get('/reset/verify', verifyToken_for_resetPass, (req, res) => res.status(200).json({message:'Token Verified'}))

AuthRoutes.post('/reset/pass',verifyToken_for_resetPass, resetPassword)






module.exports = { AuthRoutes }