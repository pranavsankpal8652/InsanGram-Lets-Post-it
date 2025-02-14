import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { FaRegEye } from 'react-icons/fa';

function Register({ Modal }) {
  const navigate = useNavigate()
  const [showPassword, setshowPassword] = useState(false)




  const APIBaseUrl = import.meta.env.VITE_API_BASE_URL
  // console.log(APIBaseUrl)
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${APIBaseUrl}user/register`, form)
      .then((res) => {
        toast.success(res.data.message)
        navigate('/')
        // console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        toast.error(err.response?.data?.message || "Something Went Wrong!")
      })
  };

  return (
    <>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-amber-200 via-transparent to-blue-400 p-4 md-p-0">
        <h1 className="text-4xl font-bold mb-6">Register</h1>
        <form className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl " onSubmit={handleSubmit} autoComplete='off'>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
            autoFocus
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type={showPassword?'text':'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button type='button' className=' absolute top-[60%] right-2 cursor-pointer' onMouseDown={() => setshowPassword(true)} onMouseUp={() => setshowPassword(false)}><FaRegEye/></button>
          </div>
          <button className="w-full cursor-pointer bg-indigo-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300" type="submit">
            Register
          </button>
        </form>
        <span>already registered!
          <Link to='/' className=' underline text-blue-400 text-lg p-3'>Login here</Link>
        </span>

      </div>

    </>

  );
}

export default Register;
