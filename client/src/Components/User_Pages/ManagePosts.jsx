import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Posts from '../Posts';
import ActionButtons from '../ActionButtons';

export default function ManagePosts() {
    const APIBaseUrl = import.meta.env.VITE_API_BASE_URL
    const navigate = useNavigate()
    const [myPosts, setMyposts] = useState([])
    const [staticPath, setStaticPath] = useState('')
    
    const getMyposts=()=>{
        axios.get(`${APIBaseUrl}ownerPosts/read`, {
            headers: {
                Authorization: `bearer ${localStorage.getItem('Auth')}`
            }
        }).then(res => {
            // console.log(res.data)
            setMyposts(res.data.Posts)
            setStaticPath(res.data.staticPath)
        })
            .catch(error => {
                console.log(error)
                toast.error(error.response?.data?.message || 'Something went wrong')

            })
    }
    useEffect(() => {
        getMyposts()
    },[])

    useEffect(() => {
        axios.get(`${APIBaseUrl}user/access`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Auth')}`
            }
        })
            .then(res => {
                // toast.success(res.data.message)
            })
            .catch(error => {
                // console.log(err)
                if (!error.response?.config.__isHandled) {
                    error.response.config.__isHandled = true; // Mark as handled
                    toast.error(error.response?.data?.message);
                }
                navigate('/')

                return Promise.reject(error);
            })
    }, [])

    return (
       <div className="min-h-screen  bg-gradient-to-tr from-amber-400 via-transparent to-blue-400 p-3 ">
            <ActionButtons />
            <h1 className="md:text-6xl text-4xl  text-center text-gray-900  mb-6 font-extrabold">
              Your Posts
            </h1>
      
      
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7  items-start max-w-[1400px] mx-auto">
            {myPosts.map((post) => (
                <Posts key={post._id} post={post} staticPath={staticPath} editable={true} getMyposts={getMyposts}/>
              ))}
            </div>
          </div>
    )
}
