import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
export default function Resetpassword({token}) {
  const APIBaseUrl = import.meta.env.VITE_API_BASE_URL

    const [newPass,setNewPass]=useState('')
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true)
      let userData={
       newPass
      }
      if(newPass!==''){
          axios.post(`${APIBaseUrl}user/reset/pass`,userData,{
            headers:{
              Authorization:`bearer ${token}`
            }
          })
          .then(res=>{
            setLoading(false)
            toast.success(res.data.message)
            navigate('/')
            // console.log(res.data)
          })
          .catch(err=>{
              console.log(err)
              toast.error(err.response?.data?.message || 'Something went wrong')
          })
      }
    };

  return (
  <>
    <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Enter your new password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            id='Password'
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
           {loading?'resetting password..':'Reset Password'} 
          </button>
        </form>
      </motion.div>
  </>
  )
}
