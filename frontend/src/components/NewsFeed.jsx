import "./NewsFeed.css";
import Post from "./Post";

const NewsFeed = ({ posts }) => {
    return (
        <div className="newsfeed-container">
        {posts.map((post) => (
            <div className="post-card" key={post._id}>
            <Post post={post} />
            </div>
        ))}
        </div>
    );
};

export default NewsFeed;