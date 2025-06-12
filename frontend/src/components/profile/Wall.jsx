import Post from "../Post";
import NewPost from "../NewPost";

export const Wall = ({ posts, showWall, onPostCreated, profile, onPostLikeToggle}) => {
    if (!Array.isArray(posts)) return <p>Unexpected data</p>;
    if (showWall) {
        return (
            <div className="wallContainer">
            <h2>{`${profile.basicInfo.firstName}'s`} Wall</h2>
            <NewPost  onPostCreated={onPostCreated}/>
            {posts.map((post) => (
                <div className="post-card" key={post._id}>
                <Post post={post} onPostLikeToggle={onPostLikeToggle}/>
                </div>
            ))}
            </div>
        )
    }
}