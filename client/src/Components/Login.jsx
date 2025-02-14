import axios from 'axios';
const APIBaseUrl = import.meta.env.VITE_API_BASE_URL

import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { FaRegEye } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate()

  const { loggedIn, setLoggedIn } = useContext(AuthContext)

  const [showPassword,setshowPassword]=useState(false)

  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard')
    }
  }, [loggedIn])
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form)
    axios.post(`${APIBaseUrl}user/login`, form)
      .then((res) => {
        toast.success(res.data.message)
        // console.log(res.data)
        localStorage.setItem("Auth", res.data.token);
        setLoggedIn(true)
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000);

      })
      .catch(err => {
        console.log(err)
        toast.error(err.response?.data?.message || "Something Went Wrong!")

      })
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen  md:bg-gradient-to-tr from-amber-600 via-transparent to-blue-700 p-4 absolute md:static  bg-transparent top-0">
        <h1 className="text-4xl font-bold mb-6 hidden md:block">Login</h1>
        <form className="w-full max-w-md  p-8 py-20 rounded-lg shadow-xl " onSubmit={handleSubmit} autoComplete='off'>
          <div className="mb-4">
            <label className="block text-sm font-bold md:text-gray-700  text-gray-400 mb-2" htmlFor="username">Username</label>
            <input
              type="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full text-white md:text-black px-3 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-bold md:text-gray-700  text-gray-400 mb-2" htmlFor="password">Password</label>
            <input
              type={showPassword?'text':'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border text-white md:text-black border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button type='button' className=' absolute top-[60%] right-2 cursor-pointer' onMouseDown={()=>setshowPassword(true)} onMouseUp={()=>setshowPassword(false)}><FaRegEye/></button>
          </div>
          <button type='submit' className="w-full bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-green-700 transition duration-300" >
            Login
          </button>
          <div className='text-center'>
            <Link to='forgotpass'>
              <span className='text-blue-400 cursor-pointer'>forgot password?</span>
            </Link>

          </div>
        </form>
        <span className='text-white'>not the member!
          <Link to='/register' className='underline md:text-amber-900  text-xl p-3'>register here</Link>
        </span>
      </div>
    </>

  );
}

export default Login;
