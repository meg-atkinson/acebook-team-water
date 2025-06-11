import {useNavigate} from "react-router-dom"

function Post({ post }) {
  const navigate = useNavigate()
  const user = post.userID;

  const handleClick = () =>  {
    navigate(`/profile/${user._id}`)
  }

  return (
    <>
      <div className="post-author-info" onClick={handleClick} style={{cursor: "pointer"}}>
        <img
          src={
            user?.photos?.profilePicture
              ? `http://localhost:3000/${user.photos.profilePicture}`
              : '/default-profile.png'
          }
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
    </>
  );
}

export default Post;