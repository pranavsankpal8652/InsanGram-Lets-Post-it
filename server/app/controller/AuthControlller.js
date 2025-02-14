const { userModel } = require("../model/UsersModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { transporter } = require("../config/mailer");
require('dotenv').config();

const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    let insUserObj = {
        "userName": username,
        "userEmail": email,
        "password": hashedPassword
    }
    try {
        const insUser = new userModel(insUserObj)
        const insUserObj_res = await insUser.save()
        var obj = {
            status: 1,
            message: 'Registration Success',
            insUserObj
        }
    }
    catch (err) {
        var obj = {
            status: 0,
            message: 'Something went wrong..try again later',
        }

    }
    res.send(obj)
}

const loginUser = (req, res) => {
    //Genarate JWT Token
    const userName = req.user.userName
    const id=req.user._id
    const token = jwt.sign({ userName,id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
    res.json({ message: `Welcome ${userName} `, token })

}


const generate_resetPassword_Link=async(req,res)=>{
    // console.log('elloo')
    const {email,resetLink} = req.body
    // console.log(req.body.email)
    const token=jwt.sign({email},process.env.JWT_SECRET_KEY,{expiresIn:'5m'})
    const FinalResetLink=resetLink+token
    try{
        await transporter.sendMail({
            from: `"PostSphere Password Reset" ${process.env.EMAIL}`, // sender address
            to: email, // list of receivers
            subject: "Reset Your Password", // Subject line
            text: `The Link Will be Expired in 5 minutes.\nReset here: ${FinalResetLink}`, // plain text version
            html: `
              <div style="font-family: Arial, sans-serif; text-align: center;">
                <h2>Reset Your Password</h2>
                <p>The link below will expire in <b>5 minutes</b>.</p>
                <a href="${FinalResetLink}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Reset Password
                </a>
                <p>If you didn't request this, ignore this email.</p>
              </div>
            `, // HTML email body
          });
          res.status(200).json({message:'Link has been sent'})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:'Problem sending link'})

    }

}
const resetPassword=async(req,res)=>{
    const {newPass}=req.body
    const hashedPass=await bcrypt.hash(newPass,10)
    const email=req.user.email
    try{
        await userModel.updateOne({userEmail:email},{$set:{password:hashedPass}})
        res.status(200).json({message:'Password Reset Successful'})
    }catch(err){
        console.log(err)
        res.status(400).json({message:'Problem Resetting Password!Try Again'})
    }
}

module.exports = { registerUser, loginUser,generate_resetPassword_Link,resetPassword }