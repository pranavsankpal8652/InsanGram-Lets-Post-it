import { FaImage, FaVideo, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import ActionButtons from "../ActionButtons";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import MediaPreviews from "../MediaPreviews";

const PostCreation = () => {
  const APIBaseUrl = import.meta.env.VITE_API_BASE_URL
  const navigate = useNavigate()
  const [previewType, setPreviewType] = useState('FileObject')
  const [preview, setpreview] = useState([])
  const [postData, setPostData] = useState({
    caption: '',
    media: [],
    _id: ''
  })

  const { id } = useParams()
  useEffect(() => {
    if (id !== undefined) {
      axios.get(`${APIBaseUrl}ownerPosts/read/${id}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('Auth')}`
        }
      }).then(res => res.data)
        .then(finalres => {
          // console.log(finalres)
          setPostData({
            caption: finalres.Post.postCaption,
            media: finalres.Post.postMedia,
            _id: finalres.Post._id
          })
          setPreviewType('URL')
          setpreview(finalres.Post.postMedia.map(media => `${APIBaseUrl + finalres.staticPath + media}`))
        })
        .catch(error => {
          console.log(error)
          toast.error(error.response?.data?.message || 'Something went wrong')

        })

    }
    else {
      setPostData(
        {
          caption: '',
          media: [],
          _id: ''
        }
      )
      setpreview([])
      setPreviewType('FileObject')
    }


  }, [id])

  const handleSubmitPost = () => {
    // console.log(postData)
    // console.log(preview)
    const formdata = new FormData()
    formdata.append('caption', postData.caption)
    postData.media.forEach(media => {
      if (typeof media === 'string') {
        formdata.append('existingMedia', media)
      }
      else {
        formdata.append('media', media)
      }
    })
    formdata.append('_id', postData._id)
    axios.post(`${APIBaseUrl}ownerPosts/create`, formdata, {
      headers: {
        Authorization: ` bearer ${localStorage.getItem('Auth')}`
      }
    }).then(res => {
      toast.success(res.data.message)
      navigate('/manage')
    }).catch(error => {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    })

  }
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files && files[0]) {
      if (files[0].size <= 5000000) {
        setPostData(prev => ({ ...prev, [name]: [...prev[name], files[0]] }))
        setpreview((prev) => {
          // If editPage is true, ensure old previews and new ones are handled correctly
          if (previewType == 'URL' && prev.length > 0 && typeof prev[0] === "string") {
            return [...prev, ...Array.from(files)]; // Append files to existing URLs
          }

          return [...(prev || []), ...files]; // Handle empty case properly
        });
        return setPreviewType('FileObject')

      }
      else {
        toast.error('File size too long')
      }

    }
    return setPostData(prev => ({ ...prev, [name]: value }))
  }

  const removeMedia = (delmedia) => {
    // console.log(delmedia)
    setPostData(prev =>{
      if (typeof delmedia == 'string' && previewType=="URL") {
        return ({ ...prev, media: prev.media.filter(postmedia => postmedia !== delmedia.split('media/')[1]) })
      }
      return ({ ...prev, media: prev.media.filter(postmedia => postmedia !== delmedia) })

    })
     
  setpreview(prev => prev.filter(postmedia => postmedia !== delmedia))

}
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
  <div className="min-h-screen bg-gradient-to-tr from-amber-500 via-transparent to-blue-500 p-5 rounded-lg relative">
    <ActionButtons />
    <div className="m-5 p-4">
      <h2 className="md:text-4xl text-3xl font-semibold mb-3">Create a Post</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-20 gap-10">
        <textarea
          className="w-full border rounded-lg p-2 text-xl min-h-[200px] focus:outline-none focus:ring focus:ring-blue-300"
          rows="10"
          placeholder="What's on your mind?"
          value={postData.caption}
          onChange={handleChange}
          name="caption"
          autoFocus
        ></textarea>

        {/* Media Preview */}
        <MediaPreviews preview={preview} removeMedia={removeMedia} previewType={previewType} />

      </div>



      {/* Media Upload Buttons */}
      <div className="flex items-center gap-3 mt-3">
        <label className="cursor-pointer flex items-center gap-1 text-blue-600 text-lg">
          <FaImage />
          <span>Image</span>
          <input type="file" accept="image/*" className="hidden" name="media" onChange={handleChange} />
        </label>
        <label className="cursor-pointer flex items-center gap-1 text-blue-600 text-lg">
          <FaVideo />
          <span>Video</span>
          <input type="file" accept="video/*" className="hidden" name='media' onChange={handleChange} />
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <Link to='/dashboard' className="bg-gray-400 text-white py-1 px-4 rounded-lg">
          Cancel
        </Link>
        <button onClick={handleSubmitPost} className="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700">
          {id ? 'Update' : 'Post'}
        </button>
      </div>
    </div>

  </div>
);
};

export default PostCreation;
