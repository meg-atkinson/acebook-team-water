import "./NewsFeed.css";
import Post from "./Post";

const NewsFeed = ({ posts, onPostLikeToggle }) => {
    return (
        <div className="newsfeed-container">
        {posts.map((post) => (
            <div className="post-card" key={post._id}>
            <Post post={post} onPostLikeToggle={onPostLikeToggle}/>
            </div>
        ))}
        </div>
    );
};

export default NewsFeed;