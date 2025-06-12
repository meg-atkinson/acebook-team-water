import { useState } from "react";
import { likePost, unlikePost } from "../services/posts"
import { useUser } from "../App";

export const LikeButton = ({ post,  onPostLikeToggle }) => {
    const { user } = useUser()
    const [isLiking, setIsLiking] = useState(false);
  // Check if logged in user has liked this post already
    const isLiked = post.likes && post.likes.includes(user.id);
    // get like count using virtual in db schema
    const likeCount = post.likeCount;

    const handleClick = async () => {
        const token = localStorage.getItem("token");
        // Prevent double clicks
        if (isLiking) return; 
        // otherwise set the like to true
        setIsLiking(true);
        try {
        let result;
        if (isLiked) {
            result = await unlikePost(token, post._id);
        } else {
            result = await likePost(token, post._id);
        }
        // Update the parent component with the new post data
        if (onPostLikeToggle) {
            onPostLikeToggle(result.post);
        }
        } catch (error) {
        console.error("Failed to set like:", error);
        } finally {
        setIsLiking(false);
        }
    };

    return (
    <button 
        onClick={handleClick} 
        disabled={isLiking}
        className={`like-button ${isLiked ? 'liked' : 'not-liked'}`}
        >
        {/* Heart icon - hollow or solid based on like status */}
        <span className="heart-icon">
            {isLiked ? '❤️ ' : '🤍 '}
        </span>
        {/* Like count */}
        <span className="like-count">
            {likeCount}
        </span>
        </button>
    );
};