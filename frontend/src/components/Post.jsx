import {useNavigate} from "react-router-dom"
import { LikeButton } from "./LikeButton";

function Post({ post, onPostLikeToggle}) {

  const navigate = useNavigate()
  //author of post
  const user = post.userID;

  const handleClick = () =>  {
    navigate(`/profile/${user._id}`)
  }

  return (
    <>
      <div className="post-author-info" onClick={handleClick} style={{cursor: "pointer"}}>
        <img
          src={user?.photos?.profilePictureUrl}
          alt="Profile"
          className="profile-pic"
        />
        <div className="author-name">
          {user?.basicInfo?.firstName} {user?.basicInfo?.lastName}
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
      <div className="likes">
        <LikeButton post={post} onPostLikeToggle={onPostLikeToggle}/>
      </div>
    </>
  );
}

export default Post;