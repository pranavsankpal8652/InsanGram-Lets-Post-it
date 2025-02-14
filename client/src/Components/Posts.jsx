import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaEdit, FaDeploydog, FaArrowRight, FaArrowAltCircleRight } from "react-icons/fa";
import MediaSlider from "./MediaSlider";
import { Link } from "react-router";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";

const APIBaseUrl = import.meta.env.VITE_API_BASE_URL



export default function Posts({ post, staticPath, editable, getMyposts }) {

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

 

  const viewCommentsandLikes=()=>{
    axios.get(`${APIBaseUrl}posts/activities/view/${post._id}`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('Auth')}`
      }
    }).then(res => {
      // console.log(res.data)
      setComments(res.data.comments)
      // console.log(res.data.likes)
      setLikes(res.data.likes)
      if(res.data.liked) setLiked(true)

    }).catch(err => {
      console.log(err)
      toast.error('Somethin went wrong!')
    })
  }
  useEffect(()=>{
    viewCommentsandLikes()
  },[])
  
  // Handle Like
  const toggleLike = () => {
    axios.post(
      `${APIBaseUrl}posts/likes/update/${post._id}`, 
      {}, // Empty object as the request body (if no data is required)
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Auth')}` 
        }
      }
    ).then(res => {
      // console.log(res.data);
      viewCommentsandLikes()
      setLiked(!liked)
    }).catch(err => {
      console.log(err);
      toast.error('Something went wrong!');
    });
};


  // Handle Comment
  const addComment = () => {
    if (newComment.trim()) {
      let comment = {
        newComment,
        postId:post._id
      }
      axios.post(`${APIBaseUrl}posts/comments/add`, comment, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('Auth')}`
        }
      }).then(res => {
        // console.log(res)
        setNewComment("");
        viewCommentsandLikes();
      }).catch(err => {
        console.log(err)
        toast.error('Somethin went wrong!')
      })
    }
  };

  const deletePost = () => {
    if (confirm('Are you sure to delete the post')) {
      axios.delete(`${APIBaseUrl}ownerPosts/delete/${post._id}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('Auth')}`
        }
      }).then(res => {
        toast.info('Post Deleted')
        getMyposts()
      }).catch(error => {
        console.log(error)
        toast.error(error.response?.data?.message || 'Something went wrong')
      })
    };
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg  p-4 relative">
      {
        editable
        &&
        <>
          <Link to={`/create/${post._id}`}>
            <FaEdit className="absolute text-white top-4 right-10 md:text-xl text-lg" title="Edit" />
          </Link>
          <MdDeleteForever onClick={deletePost} className="text-red-400 md:text-3xl text-2xl absolute top-2.5 right-1 cursor-pointer" title="Delete" />
        </>

      }
      {/* Profile Section */}
      <div className="flex items-center gap-3">
        <h3 className="font-bold text-gray-900 dark:text-gray-200 text-xl ">{post.owner.userName}</h3>
      </div>

      {/* Post Content */}
      {
        post.postMedia !== null
        &&
        <MediaSlider medias={post.postMedia} staticPath={staticPath} />

      }


      <p className="text-gray-700 dark:text-gray-300 mt-5 max-h-[50px] overflow-auto font-bold text-lg">{post.postCaption}</p>

      {/* Like & Comment Buttons */}
      <div className="flex items-center justify-between mt-4">
        <button onClick={toggleLike} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} {likes}
        </button>
        <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <FaComment /> {comments.length}
        </button>
      </div>

      {/* Comment Input */}
      <div className="mt-3 relative">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => { 
            if (e.key === "Enter") addComment(); 
          }}
        />
        <button onClick={addComment} className="h-[100%] bg-blue-500 text-white p-2 rounded absolute right-0 top-0 cursor-pointer" title="Add">
          <FaArrowAltCircleRight/>
        </button>
      </div>

      {/* Comments List */}
      <div className="mt-3 md:min-h-[70px] min-h-[50px] max-h-[100px] md:max-h-[130px] overflow-auto  relative">
        <h2 className="opacity-[0.6] text-white mb-2">Comments:</h2>
        {
          comments.length > 0
            ?
            comments.map((comment, index) => (
              <React.Fragment key={index}>
              <h2 className="pl-5 text-gray-50">{comment.user.userName}<span className="text-[12px] ml-2">{moment(comment.timestamp).fromNow()}</span></h2>
              <p key={index} className="text-gray-600 dark:text-gray-300 text-sm border-l-4 border-blue-500 pl-6 mb-5 pt-0.5">
                {comment.text}
              </p>
              </React.Fragment>
              
            ))
            :
            <p className="opacity-[0.3] text-gray-50">Be the first to comment..</p>
        }
      </div>

    </div>
  );
}
