import { useContext, useEffect, useState } from "react";
import Posts from "./Posts";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import ActionButtons from "./ActionButtons";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard() {
  const APIBaseUrl = import.meta.env.VITE_API_BASE_URL

  const { loggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn) {
      navigate('/')
    }
  }, [])

  const [posts, setposts] = useState([]);
  const [staticPath, setStaticPath] = useState('');


  useEffect(() => {
    axios.get(`${APIBaseUrl}posts/get`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('Auth')}`
      }
    }).then(res => {
      // console.log(res.data)
      setposts(res.data.Posts)
      setStaticPath(res.data.staticPath)
    }).catch(err => {
      console.log(err)
      toast.error(err.response?.data?.message || 'Something went wrong')

    })
  }, [])
  return (
    <div className="min-h-screen  bg-gradient-to-tr from-amber-400 via-transparent to-blue-400 p-3 ">
      <ActionButtons />
      <h1 className="md:text-5xl text-4xl  text-center text-gray-900  mb-6 font-extrabold">
        Social Feed
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-7  items-start max-w-[1400px] mx-auto">
      {posts.map((post) => (
        // console.log(post)
          <Posts key={post._id} post={post} staticPath={staticPath} />
        ))}
      </div>
    </div>
  );
}
