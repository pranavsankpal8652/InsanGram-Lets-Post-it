import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router";
import Resetpassword from "./Resetpassword";

export default function ForgotPass() {
  const APIBaseUrl = import.meta.env.VITE_API_BASE_URL

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [ResetPage, setResetPage] = useState(false)

  const { token } = useParams()
  useEffect(() => {
    if (token !== undefined) {
      axios.get(`${APIBaseUrl}user/reset/verify`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
        .then(res => {
          setResetPage(true)
          console.log(res.data.message)

        }).catch(err => {
          console.log(err)
          toast.error(err.response?.data?.message || "Something Went Wrong!")

        })
    }
  }, [token])
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    let userEmail = {
      email,
      resetLink: 'http://localhost:5173/forgotpass/'
    }
    if (email !== '') {
      axios.post(`${APIBaseUrl}user/forgot/pass`, userEmail)
        .then(res => {
          // console.log(res.data)
          toast.success(res.data.message)
          setLoading(false)

        })
        .catch(err => {
          console.log(err)
          toast.error(err.response?.data?.message || 'Something went wrong')
          setLoading(false)

        })
    }
  };

  return (
    <div className="flex p-4 justify-center items-center min-h-screen  bg-gradient-to-tr from-amber-600 via-transparent to-blue-700">

      {
        ResetPage
          ?
          <Resetpassword  token={token} />
          :
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-500 text-center mb-4">
              Enter your email or username, and we'll send you a reset link here.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                id='email'
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {loading ? 'sending link..' : 'Send Reset Link'}
              </button>
            </form>
            <div className="my-5">
              <Link to='/' className="py-10">&larr;Back to login</Link>
            </div>
          </motion.div>
      }

    </div>
  );
}
