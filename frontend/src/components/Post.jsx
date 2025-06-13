import {useNavigate} from "react-router-dom"
import { LikeButton } from "./LikeButton";
import {useEffect, useState} from 'react'
import {getUser} from '../services/user.js'

function Post({ post, onPostLikeToggle}) {
  const [targetUser, setTargetUser] = useState(null)

  const navigate = useNavigate()
  //author of post
  const user = post.userID;

  const handleClick = () =>  {
    navigate(`/profile/${user._id}`)
  }


  useEffect(() =>{
    const token = localStorage.getItem("token");
    
    const getTargetPost = async () => {
      try{
      const targetUserFetch = await getUser(token, post.targetUserID._id)
      setTargetUser(targetUserFetch.user)
      }
      catch(error){
        console.error(error)
      }
      
    }
    getTargetPost()
  },[post.targetUserID])

  return (
    <>

      <div className="post-author-info" onClick={handleClick} style={{cursor: "pointer"}}>
        <div className="post-img-container">
          <img
          src={user?.photos?.profilePictureUrl}
          alt="Profile"
          className="profile-pic"
        />
        </div>
        <div className="names-container">
        <div className="author-name">
          {user?.basicInfo?.firstName} {user?.basicInfo?.lastName}
          {targetUser?.basicInfo && targetUser._id !== user._id && (
  <span><span className="arrow-emoji">➡️</span>{targetUser.basicInfo.firstName} {targetUser.basicInfo.lastName}</span>
)}
        </div>
      </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="Post"
            className="post-image"
          />
        )}
      </div>
      <div className="likes-and-timestamp" >
          {new Date(post.createdAt).toLocaleString()}
          <LikeButton post={post} onPostLikeToggle={onPostLikeToggle}/>
      </div>
    </>
  );
}

export default Post;